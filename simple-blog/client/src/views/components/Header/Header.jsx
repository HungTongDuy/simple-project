import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon';

import './Header.css';
import { DialogContentText } from '../../../../node_modules/@material-ui/core';

import { toggleDialogClose, toggleDialogOpen, signOut } from '../../../core/actions';

import { GoogleLogout } from 'react-google-login';

import MainMenu from '../../components/MainMenu';
import SignIn from '../../components/SignIn';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
        }
        
        this.handleClose = this.handleClose.bind(this);
        this.handleOpenSignIn = this.handleOpenSignIn.bind(this);
        this.handleOpenSignUp = this.handleOpenSignUp.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCloseMenu = this.handleCloseMenu.bind(this);
        this.signoutGoogle = this.signoutGoogle.bind(this);
    }

    handleClose() {
        this.props.toggleDialogClose();
    };

    handleOpenSignIn() {
        this.props.toggleDialogOpen({ signIn: true, signUp: false });
    };

    handleOpenSignUp() {
        this.props.toggleDialogOpen({ signIn: false, signUp: true });
    };

    handleClick(event) {
        this.setState({ anchorEl: event.currentTarget });
    };
    
    handleCloseMenu() {
        this.setState({ anchorEl: null });
    };

    signoutGoogle() {
        this.props.signOut();
        this.setState({ anchorEl: null });
    };

    render() {
        const logoutGoogle = (res) => {
            console('res-logout', res);
        };
        const authUser = this.props.authUser;
        console.log('authUser: ', authUser);
        let url = "";
        if(Object.keys(authUser.user).length > 0){
            let n = authUser.user.email.lastIndexOf('@');
            let user_key = authUser.user.email.slice(0, n);
            url = "/profile/@" + user_key + "/" + authUser.user._id + "/";
        }
        
        // console.log('this.props.authUser.user.provider_pic', this.props.authUser.user.provider_pic);
        return (
            <div className="header container">
                <div className="js-metabarLogoCentered">
                    <div className="header-logo">
                        <Link className="link" to="/">
                            <img src="https://res.cloudinary.com/hungtong/image/upload/v1534815888/stories-logo.svg" width="150" height="45" />
                            {/* <svg className="svgIcon-use" width="138" height="27" viewBox="0 0 138 27">
                                <path d="M130 27V16.96c0-3.26-.154-5.472-2.437-5.472-1.16 0-2.138.57-2.863 1.512.217.906.3 1.968.3 3.127 0 2.247.036 5.11 0 7.973 0 .472-.046.58.244.87L127 27h-8V16.96c0-3.297-.461-5.472-2.708-5.472-1.16 0-1.64.653-2.292 1.595V24.1c0 .472-.026.58.3.87L116 27h-8V11.56c0-.47-.07-.579-.36-.905L106 9h8v3.612c.906-2.537 2.437-4.112 5.372-4.112 2.682 0 4.494 1.466 5.255 4.257.834-2.392 3.008-4.257 6.053-4.257 3.588 0 5.32 2.626 5.32 7.627 0 2.392.036 5.11 0 7.973 0 .472.004.652.25.87L138 27h-8zm-27-3.045c0 .472-.149.617.178.906L105 27h-8v-4c-.906 2.465-2.956 4-5.637 4C87.775 27 86 24.39 86 19.461c0-2.391-.036-5 0-7.936 0-.471-.11-.58-.4-.87L84 9h8v9.628c0 3.225.269 5.4 2.298 5.4 1.16 0 2.086-.725 2.702-1.63V11.56c0-.471-.129-.58-.419-.906L95 9h8v14.955zM78.002.25A3.248 3.248 0 0 1 81.25 3.5 3.25 3.25 0 1 1 78.002.25zM75 27V11.56c0-.47.168-.579-.122-.905L73 9h8v15.1c0 .472-.01.678.24.9L83 27h-8zM64 11.706c-.507-.652-1.418-1.123-2.396-1.123-1.957 0-3.842 1.775-3.842 7.03 0 4.93 1.631 6.669 3.66 6.669.907 0 1.853-.436 2.578-1.378V11.706zm6 12.286c0 .47-.026.58.3.87L72 27h-8v-3.697C62.913 25.804 60.951 27 58.632 27 54.5 27 51.5 23.738 51.5 17.795c0-5.582 3.254-9.314 7.784-9.314 2.356 0 3.919 1.123 4.716 2.899V3.878c0-.471-.077-.617-.403-.906L62 1.305 70 .29v23.702zM43.9 16c.037-.471.037-.67.037-.815 0-4.747-.937-5.435-2.437-5.435-1.5 0-2.854.995-2.927 6.25h5.328zm-5.327 1c0 4.711 2.392 6.63 5.183 6.63 2.174 0 4.313-.943 5.509-3.335h.072c-.942 4.566-3.77 6.705-8.01 6.705-4.566 0-8.879-2.755-8.879-9.133 0-6.705 4.277-9.386 9.097-9.386 3.842 0 7.937 1.811 7.937 7.646 0 .109 0 .438-.036.873H38.573zM31.5 27h-12l2.39-2.646c.084-.084.11-.399.11-.87V7l-7.866 20L5.581 8.372C5.364 7.9 5.181 7.285 5 6.777V20.62c0 .58-.035.653.364 1.196L9 27H0l3.64-5.183c.399-.543.36-.616.36-1.196V6.27c0-.617.095-.69-.195-1.051L1 1h8.495l7.355 16.3L23.24 1h8.26l-2.2 2.75c-.326.326-.3.599-.3 1.106v18.629c0 .47.005.75.138.87L31.5 27z"></path>
                            </svg> */}
                        </Link>
                    </div>
                    <div className="menu header-menu">
                        <MainMenu />
                    </div>
                    <div className="header-account">
                        <div className="sign-in-button">
                        {
                            !this.props.authUser.isAuth ? '' : 
                            <div className="group-user">
                                <Link className="link button green-border-button" data-behavior="trigger-overlay" to="/article/editor">Write a story</Link>
                                {(authUser.user.provider_pic != null && authUser.user.provider_pic != undefined)  ?
                                    <Avatar onClick={this.handleClick} alt={authUser.user.name} src={authUser.user.provider_pic} className="avatar" /> 
                                    :
                                    <Icon className="avatar" color="primary" onClick={this.handleClick}>
                                        account_circle
                                    </Icon>  
                                }
                                {/* <GoogleLogout
                                    buttonText="Sign out"
                                    onLogoutSuccess={logoutGoogle}
                                >
                                </GoogleLogout> */}
                            </div>
                        }
                        {authUser.isAuth ? '' : <a href="#" className="button green-border-button" onClick={this.handleOpenSignIn}>Sign In</a>}
                        {authUser.isAuth ? '' : <a href="#" className="button green-border-button signup-btn" onClick={this.handleOpenSignUp}>Sign Up</a>}
                            {/* <Link to="/signin" className="button green-border-button">Sign in</Link> */}
                        </div>
                        <Menu
                            id="simple-menu"
                            anchorEl={this.state.anchorEl}
                            open={Boolean(this.state.anchorEl)}
                            onClose={this.handleCloseMenu}
                        >
                            <MenuItem onClick={this.handleCloseMenu}>
                                <Link className="link" to={url}>Profile</Link>
                            </MenuItem>
                            <MenuItem onClick={this.handleCloseMenu}>
                                <Link className="link" to="">Settings</Link>
                            </MenuItem>
                            <MenuItem onClick={this.signoutGoogle}>
                                <Link className="link" to="">Sign out</Link>
                            </MenuItem>
                        </Menu>
                    </div>
                </div>
                <Dialog
                    open={this.props.common.openDialogSignin}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    {!this.props.common.signUp ? '' : 
                        <DialogTitle id="alert-dialog-title">{"Join With Us."}</DialogTitle>
                    }
                    {!this.props.common.signIn ? '' : 
                        <DialogTitle id="alert-dialog-title">{"Welcome back."}</DialogTitle>
                    }
                    <Grid container spacing={24} item xs={8} sm={8} className="dialog-text">
                        {!this.props.common.signUp ? '' : 
                            <DialogContentText>
                            Create an account to personalize your homepage, follow your favorite authors and publications, applaud stories you love, and more.
                            </DialogContentText>
                        }
                        {!this.props.common.signIn ? '' : 
                            <DialogContentText>
                            Sign in to access your personalized homepage, follow authors and topics you love, and clap for stories that matter to you.
                            </DialogContentText>
                        }
                    </Grid>
                    <DialogContent>
                        <SignIn />
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log('state', state);
    return {
        authUser: state.authUser,
        common: state.common
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleDialogClose: data => dispatch(toggleDialogClose()),
        toggleDialogOpen: data => dispatch(toggleDialogOpen(data)),
        signOut: data => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);