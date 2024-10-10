"use strict";

import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import './SignIn.css';
import LinearProgress from '@material-ui/core/LinearProgress';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';

import { 
    signInWithGoogle, 
    signInWithFacebook, 
    signInWithAccount,
    signUpWithAccount
} from '../../../core/actions';

import { FACEBOOK_APP_ID } from '../../../core/constants';

import GoogleLogin from 'react-google-login';

import FacebookProvider, { Login } from 'react-facebook';

import FacebookLogin from 'react-facebook-login';

class SignIn extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            name: '',
            email: '',
            password: '',
            showPassword: false,
            redirect: false,
            isRequireEmail: false,
            messageEmail: '',
            isRequireName: false,
            messageRequiredName: '',
            isRequirePassword: false,
            messageRequiredPass: ''
        }

        this.handleChangeFullName = this.handleChangeFullName.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.submitSignIn = this.submitSignIn.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.componentClicked = this.componentClicked.bind(this);
        this.submitSignUp = this.submitSignUp.bind(this);

        this.handleResponse = this.handleResponse.bind(this);
        this.handleError = this.handleError.bind(this);

        this.validateEmail = this.validateEmail.bind(this);

        
    }

    handleChangeFullName(e) {
        var isRequire = false;
        var message = '';
        if (e.target.value != '') {
            isRequire = true;
            message = 'Required';
        }
        console.log('handleChangeFullName-require: ', isRequire);
        this.setState({
            isRequireName: isRequire,
            messageRequiredName: message,
            name: e.target.value
        });
    };

    handleChangePassword(e) {
        console.log('password', e.target.value);
        //this.setState({ password: e.target.value });
        var isRequire = false;
        var message = '';
        if (e.target.value != '') {
            isRequire = true;
            message = 'Required';
        }
        console.log('handleChangePassword-require: ', isRequire);
        this.setState({
            isRequirePassword: isRequire,
            messageRequiredPass : message,
            password: e.target.value 
        });
    };

    handleChangeEmail(e) {
        console.log('email', e.target.value);
        if(this.validateEmail(e.target.value)) {
            this.setState({
                isRequireEmail: true,
                messageEmail: ``,
                email: e.target.value
            });
        } else {
            this.setState({
                isRequireEmail: false,
                messageEmail: `$${e.target.value} is not a valid email.`
            });
        }
    };

    validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    handleMouseDownPassword(event) {
        event.preventDefault();
    };
    
    handleClickShowPassword() {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    submitSignIn() {
        const { signInWithAccount } = this.props;
        var postData = {};
        postData.email = this.state.email;
        postData.password = this.state.password;
        signInWithAccount(postData);
    };

    submitSignUp() {
        console.log('submitSignUp');
        const { signUpWithAccount } = this.props;
        var postData = {};
        postData.name = this.state.name;
        postData.email = this.state.email;
        postData.password = this.state.password;
        const { isRequireEmail, isRequireName, isRequirePassword } = this.state;
        if (isRequireEmail && isRequireName && isRequirePassword) {
            signUpWithAccount(postData);
        }
    };

    handleClose(){
        this.setState({ open: false });
    };

    componentClicked(e) {
        console.log('e.target', e.target);
    };

    /*
    * Login with facebook 
    */
    // ==================================================
    // response login-----
    // {
    //     profile: {
    //         email : "chang_sieu_way01@yahoo.com"
    //         first_name : "Hưng"
    //         id : "2500910329922809"
    //         last_name : "Tống"
    //         name : "Hưng Tống"
    //     },
    //     tokenDetail : {
    //         accessToken : "EAAEYzd2t1nABAJtHtIFEzZA9FZAa5IILj4kWZA2ZAY9q2YpopYxvWZB1RtT74vClROWmmxex0NjggGaEYZCS1VErdmCZAw0jcUQActSov1nYpKmkBG93hDGb5DmdVQuBUhIX1ZB9SJpyJZBUHi1AsuJAwZBXvEqf5bklan33ZACSeJBxqOG3mowlnZCZAiZCgrRZB38Ej1TrlsE9G49oQZDZD",
    //         expiresIn : 3795,
    //         reauthorize_required_in : 7776000,
    //         signedRequest : "",
    //         userID : "2500910329922809"    
    //     }
    // }
    //
    // respon picture (res.data) => http://graph.facebook.com/${userId}/?fields=picture&type=large&access_token=
    // {
    //     id: "2500910329922809",
    //     picture: {
    //         data :{
    //             height : 50
    //             is_silhouette : false
    //             url : "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2500910329922809&height=50&width=50&ext=1535871405&hash=AeTl99rI9viwkpZq"
    //             width : 50
    //         }
    //     }
    // }
    // ==================================================

    handleResponse(response) {
        console.log('handleResponse', response);
        // const { signInWithFacebook } = this.props;
        // signInWithFacebook(response);
    };

    handleError() {
        console.log('handleError');
    };

    render() {
        const responseGoogle = (res) => {
            const { signInWithGoogle } = this.props;
            signInWithGoogle(res);
        }
        FB.api(
            "/1910710955917324/ratings",
            function (response) {
                if (response && !response.error) {
                    console.log("response" + response);
                }
            }
        );
        const { messageEmail, messageRequired, isRequireEmail, isRequireName, isRequirePassword, messageRequiredName, messageRequiredPass } = this.state;
        return (
            <div>
                <Grid container spacing={24} item xs={8} sm={8} className="signin-container">
                    {!this.props.common.signUp ? '' :
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Full Name"
                                placeholder="Full Name"
                                className="textField"
                                margin="normal"
                                onBlur={this.handleChangeFullName}
                            />
                            <span className={isRequireName ? "form-error" : "form-error is-visible"}>{messageRequiredName}</span>
                        </Grid>
                    }
                    <Grid item xs={12} sm={12}>
                        <TextField
                            label="Email"
                            placeholder="Email"
                            className="textField txt-email"
                            margin="normal"
                            onBlur={this.handleChangeEmail}
                        />
                        <span className={isRequireEmail ? "form-error" : "form-error is-visible"}>{messageEmail}</span>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <FormControl className="textField">
                            <InputLabel htmlFor="adornment-password">Password</InputLabel>
                            <Input
                                id="adornment-password"
                                type={this.state.showPassword ? 'text' : 'password'}
                                value={this.state.password}
                                onChange={this.handleChangePassword}
                                onBlur={this.handleChangePassword}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                        onMouseDown={this.handleMouseDownPassword}
                                        >
                                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <span className={isRequirePassword ? "form-error" : "form-error is-visible"}>{messageRequiredPass}</span>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} className="signin-grid-button">
                        {!this.props.common.signUp ? 
                            <Button 
                                onClick={this.submitSignIn}
                                variant="contained" 
                                className="btn btn-primary float-right" 
                                color="primary" >
                                Sign In
                            </Button> : 
                            <Button 
                                onClick={this.submitSignUp}
                                variant="contained" 
                                className="btn btn-primary float-right" 
                                color="primary" 
                                disabled={(isRequireEmail && isRequireName && isRequirePassword) ? false : true}>
                                Sign Up
                            </Button>
                        }

                        { !this.state.loading ? '' :
                            <LinearProgress />
                        }
                    </Grid>
                    <Grid item xs={12} sm={12} className="signin-grid-button">
                        <GoogleLogin className="button button-signin"
                        clientId="344016612305-frbv9ieqm5h9elj88lj3kuimct69r48e.apps.googleusercontent.com"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle} >
                            <span className="svgIcon svgIcon--googleNew svgIcon--25px">
                                <svg className="svgIcon-use" width="25" height="25" viewBox="0 0 25 25">
                                    <g fill="none" fillRule="evenodd">
                                        <path d="M20.66 12.693c0-.603-.054-1.182-.155-1.738H12.5v3.287h4.575a3.91 3.91 0 0 1-1.697 2.566v2.133h2.747c1.608-1.48 2.535-3.65 2.535-6.24z" fill="#4285F4"></path>
                                        <path d="M12.5 21c2.295 0 4.22-.76 5.625-2.06l-2.747-2.132c-.76.51-1.734.81-2.878.81-2.214 0-4.088-1.494-4.756-3.503h-2.84v2.202A8.498 8.498 0 0 0 12.5 21z" fill="#34A853"></path>
                                        <path d="M7.744 14.115c-.17-.51-.267-1.055-.267-1.615s.097-1.105.267-1.615V8.683h-2.84A8.488 8.488 0 0 0 4 12.5c0 1.372.328 2.67.904 3.817l2.84-2.202z" fill="#FBBC05"></path>
                                        <path d="M12.5 7.38c1.248 0 2.368.43 3.25 1.272l2.437-2.438C16.715 4.842 14.79 4 12.5 4a8.497 8.497 0 0 0-7.596 4.683l2.84 2.202c.668-2.01 2.542-3.504 4.756-3.504z" fill="#EA4335"></path>
                                    </g>
                                </svg>
                            </span>
                            <span className="button-label  js-buttonLabel">Sign in with Google</span>
                        </GoogleLogin>
                    </Grid>
                    <Grid item xs={12} sm={12} className="signin-grid-button">                        
                        <FacebookProvider appId={FACEBOOK_APP_ID}>
                            <Login
                            scope="email"
                            onResponse={this.handleResponse}
                            onError={this.handleError}
                            >
                            <button className="button button-signin signin-facebook">
                            <span className="svgIcon svgIcon--facebookSquare svgIcon--25px svgIcon--facebookBlue">
                                <svg className="svgIcon-use" width="25" height="25" viewBox="0 0 25 25">
                                    <path d="M20.292 4H4.709A.709.709 0 0 0 4 4.708v15.584c0 .391.317.708.709.708h8.323v-6.375h-2.125v-2.656h2.125V9.844c0-2.196 1.39-3.276 3.348-3.276.938 0 1.745.07 1.98.1v2.295h-1.358c-1.066 0-1.314.507-1.314 1.25v1.756h2.656l-.531 2.656h-2.125L15.73 21h4.562a.708.708 0 0 0 .708-.708V4.708A.708.708 0 0 0 20.292 4" fillRule="evenodd">
                                    </path>
                                </svg>
                            </span>
                            <span className="button-label  js-buttonLabel">Sign in with Facebook</span>
                            </button>
                            </Login>
                        </FacebookProvider>
                        <FacebookLogin
                            appId={FACEBOOK_APP_ID}
                            autoLoad={true}
                            fields="name,email,picture"
                            //onClick={componentClicked}
                            callback={this.handleResponse} />
                    </Grid>
                </Grid>
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        articleToEdit: state.home.articleToEdit,
        authUser: state.authUser,
        common: state.common
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        signInWithGoogle: (data) => dispatch(signInWithGoogle(data)),
        signInWithFacebook: (data) => dispatch(signInWithFacebook(data)),
        signInWithAccount: (data) => dispatch(signInWithAccount(data)),
        signUpWithAccount: (data) => dispatch(signUpWithAccount(data))
    } 
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);