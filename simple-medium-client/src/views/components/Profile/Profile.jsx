import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './Profile.css';

import ArticleList from './ArticleList';

import SnackbarNotification from '../SnackbarNotification';

import { getUserProfile, followUser, toggleDialogOpen, change_name_user, edit_user } from '../../../core/actions';

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            imgSrc: ''
        }

        this.followUser = this.followUser.bind(this);
        this.changeName = this.changeName.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.previewImg = this.previewImg.bind(this);
        this.saveUser = this.saveUser.bind(this);
    }

    componentWillMount() {
        console.log('this.props.match.params: ', this.props.match.params);
        console.log('this.props.location', this.props.location);
        this.props.getUserProfile(this.props.match.params.id);
    }

    followUser(id) {
        console.log('followUser', id);
        if(localStorage.Auth) {
            console.log('followUser');
            const user = this.props.user;
            this.props.followUser(user._id, id);
        } else {
            this.props.toggleDialogOpen({ signIn: true, signUp: false });
        }
    }

    changeName(e) {
        console.log(e.target.value);
        this.props.change_name_user(e.target.value);
        // this.setState({
        //     name: e.target.value
        // })
    }

    previewImg () {
        const file = this.refs.fileUploader.files[0]
        var reader = new FileReader()
        reader.onload = function (e) {
            document.getElementById('img_preview').src = e.target.result
            this.setState({
                imgSrc: file/*e.target.result*/
            })
        }.bind(this)
        reader.readAsDataURL(file)
    }

    handleClick () {
        this.refs.fileUploader.click()
    }

    saveUser() {
        const formdata = new FormData();
        formdata.append('_id', this.props.user._id);
        formdata.append('name', this.props.authUser.edit_name);
        formdata.append('image', this.state.imgSrc);
        formdata.append('provider_pic', JSON.stringify(this.props.user.provider_pic));
        this.props.edit_user(formdata);
    }

    render() {
        const user = this.props.user;
        const profile = this.props.profile;
        const params = this.props.match.params;
        const pathname = this.props.location.pathname;
        const common = this.props.common;
        let classActiveFollowing = "";
        // console.log('profile-user-id: ', profile.user);
        if((Object.keys(user).length > 0) && (Object.keys(profile).length > 0) && user.following.indexOf(profile.user._id) > -1) {
            classActiveFollowing = "is-active";
        }

        if(profile == undefined || Object.keys(profile).length == 0) {
            return (
                <div className="row pt-5 container homeContainer main">
                    <div className="profile-container">
                    </div>
                </div>
            )
        }

        let isEdit = false;
        if(profile.user._id == user._id) {
            isEdit = true;
        }

        let n = profile.user.email.lastIndexOf('@');
        let user_key = profile.user.email.slice(0, n);
        let href = "/profile/@" + user_key + "/" + profile.user._id + "/";

        if (params.key == "edit") {
            console.log('name---', this.props.authUser.edit_name);
            return (
                <div className="row pt-5 container homeContainer main">
                    <div className="profile-container">
                        <form className="editor-form main-editor" autoComplete="off" encrypt="multipart/form-data">
                            <Grid item xs={12} sm={12} className="banner-container">
                                <Grid item xs={9} sm={9}>
                                    <div className="user-info">
                                        <h1 className="user-name">
                                        <TextField
                                            label="Name"
                                            // placeholder="Title"
                                            value={this.props.authUser.edit_name}
                                            className="textField"
                                            margin="normal"
                                            onChange={this.changeName}
                                        />
                                            {/* <input className="" value={profile.user.name} onChange={this.changeName} /> */}
                                        </h1>
                                    </div>
                                    <div className="user-des">
                                        <p className="user-des-content"></p>
                                    </div>
                                </Grid>
                                <Grid item xs={3} sm={3} className="user-avatar">
                                    <span className="picture_upload" onClick={this.handleClick}>
                                        <i className="fa fa-camera"></i>
                                    </span>
                                    <img alt={profile.user.name} src={profile.user.provider_pic.url} id="img_preview" className="image-avt" width="120" height="120" />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <div className="hidden">
                                    <input type="file" onChange={ ()=>this.previewImg()} id="file" ref="fileUploader"/>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Button 
                                    onClick={this.saveUser} 
                                    variant="contained" 
                                    className="btn btn-primary float-right publish-button" 
                                    color="primary" >
                                    Save
                                </Button>
                                <Link to={href} className="link">
                                    <Button 
                                        // onClick={this.publishStory} 
                                        variant="contained" 
                                        className="btn btn-primary float-right publish-button" 
                                        color="primary" >
                                        Cancel
                                    </Button>
                                </Link>
                                { !common.loadingPublish ? '' :
                                    <LinearProgress className="progress-public green-border-button" />
                                }
                            </Grid>
                        </form>
                    </div>
                    <SnackbarNotification />
                </div>
            );
        }

        return (
            <div className="row pt-5 container homeContainer main">
                <div className="profile-container">
                <Grid item xs={12} sm={12} className="banner-container">
                    <Grid item xs={9} sm={9}>
                        <div className="user-info">
                            <h1 className="user-name">{profile.user.name}</h1>
                            <div className="user-follow">
                                {isEdit ? <ButtonEdit url={href} /> : <ButtonFollow followUser={(e) => this.followUser(profile.user._id)} activeFollowing={classActiveFollowing} />}
                            </div>
                        </div>
                        <div className="user-des">
                            <p className="user-des-content"></p>
                        </div>
                        <div className="number-follower">
                            <span className="number-follower-content">
                                <div className="content-row">
                                    <div className="follow">
                                        <Link to={href + "following"} className="link">
                                            {profile.user.following.length + " Following"}
                                        </Link>
                                    </div>
                                    <div className="follow">
                                        <Link to={href + "followers"} className="link">
                                            {profile.user.followers.length + " Followers"}
                                        </Link>
                                    </div>
                                    <div className="follow-dot">·</div>
                                    <div className="twitter-content">
                                        <div className="twitter-icon">
                                        <a href="" >
                                            <svg width="21" height="21" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" className="j">
                                            <path d="M18.5 4.43a6.9 6.9 0 0 1-2.18.88 3.45 3.45 0 0 0-2.55-1.12 3.49 3.49 0 0 0-3.49 3.48c0 .28.03.55.07.81a9.91 9.91 0 0 1-7.17-3.67 3.9 3.9 0 0 0-.5 1.74 3.6 3.6 0 0 0 1.56 2.92 3.36 3.36 0 0 1-1.55-.44.15.15 0 0 0 0 .06c0 1.67 1.2 3.08 2.8 3.42-.3.06-.6.1-.94.12l-.62-.06A3.5 3.5 0 0 0 7.17 15a7.33 7.33 0 0 1-4.36 1.49L2 16.44A9.96 9.96 0 0 0 7.36 18c6.4 0 9.91-5.32 9.9-9.9v-.5A6.55 6.55 0 0 0 19 5.79a6.18 6.18 0 0 1-2 .56 3.33 3.33 0 0 0 1.5-1.93"></path>
                                            </svg>
                                        </a>
                                        </div>
                                    </div>
                                </div>
                            </span>
                        </div>
                    </Grid>
                    <Grid item xs={3} sm={3} className="user-avatar">
                        <img alt={profile.user.name} src={profile.user.provider_pic.url} className="image-avt" width="120" height="120" />
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} className="">
                    {params.key == '' ? '' :
                    <FollowList followUser={this.followUser} user={user} followKey={params.key} profile={profile} />
                    }
                </Grid>
                <Grid item xs={12} sm={12} className="">
                    <ArticleList />
                </Grid>
                </div>
                <SnackbarNotification />
            </div>
        );
    }
}

const ButtonFollow = (props) => {
    return (
        <span className="followState js-followState" data-user-id="">
            <button className="button button--smallest u-noUserSelect button--withChrome u-baseColor--buttonNormal button--withHover button--unblock js-unblockButton u-marginLeft10 u-xs-hide" data-action="sign-up-prompt" data-sign-in-action="toggle-block-user" data-requires-token="true" data-redirect="https://medium.freecodecamp.org/the-art-of-computer-programming-by-donald-knuth-82e275c8764f" data-action-source="post_header_lockup">
                <span className="button-label  button-defaultState">Blocked</span>
                <span className="button-label button-hoverState">Unblock</span>
            </button>
            <button onClick={props.followUser} className={props.activeFollowing + " button button--primary button--smallest u-noUserSelect button--withChrome u-accentColor--buttonNormal button--follow js-followButton u-marginLeft10 u-xs-hide"} data-action="sign-up-prompt" data-sign-in-action="toggle-subscribe-user" data-requires-token="true" data-redirect="https://medium.com/_/subscribe/user/3299ebce81f1" data-action-source="post_header_lockup-3299ebce81f1-------------------------follow_byline">
                <span className="button-label  button-defaultState">Follow</span>
                <span className="button-label button-activeState">Following</span>
            </button>
        </span>
    )
}

const ButtonEdit = (props) => {
    return (
        <span className="followState js-followState" data-user-id="">
            <Link to={props.url + "edit"} className="link">
                <button className={" button button--primary button--smallest u-noUserSelect button--withChrome u-accentColor--buttonNormal button--follow js-followButton u-marginLeft10 u-xs-hide"} data-action="sign-up-prompt" data-sign-in-action="toggle-subscribe-user" data-requires-token="true" data-redirect="https://medium.com/_/subscribe/user/3299ebce81f1" data-action-source="post_header_lockup-3299ebce81f1-------------------------follow_byline">
                    <span className="button-label  button-defaultState">Edit Profile</span>
                </button>
            </Link>
        </span>
    )
}

const FollowList = (props) => {
    // let classActiveFollowing = "";
    let followTitle = '';
    let followArray = '';
    if(props.followKey == 'following') {
        followTitle = props.profile.user.name + " follows";
        followArray = props.profile.user.following;
    } else if(props.followKey == 'followers') {
        followTitle = props.profile.user.name + " is followed by";
        followArray = props.profile.user.followers;
    }


    return (
        <div>
            <h2>{followTitle}</h2>
            {followArray.map((item, key) => {
                let classActiveFollowing = "";
                console.log('item---', item);
                if(props.user.following.indexOf(item) > -1) {
                    classActiveFollowing = "is-active";
                }
                var n = item.email.lastIndexOf('@');
                var user_key = item.email.slice(0, n);
                var href= "/profile/@" + user_key + "/" + item._id + "/";
                console.log(user_key);

                return (
                    <div key={key}>
                        <Grid item xs={2} sm={2}>
                            <img src={item.provider_pic.url} className="avatar-image avatar-image--small" alt="Go to the profile of Tony George" />
                        </Grid>
                        <Grid item xs={10} sm={10}>
                            <Link to={href} target="_self" className="link">{item.name}</Link>
                            <ButtonFollow followUser={(e) => props.followUser(item)} activeFollowing={classActiveFollowing} />
                        </Grid>
                    </div>
                )
            })}
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return ({
        getUserProfile: _id => dispatch(getUserProfile(_id)),
        followUser: (id, userId) => dispatch(followUser(id, userId)),
        change_name_user: (text) => dispatch(change_name_user(text)),
        edit_user: (data) => dispatch(edit_user(data)),
        toggleDialogOpen: data => dispatch(toggleDialogOpen(data))
    })
}

const mapStateToProps = (state) =>({
    articleDetail: state.home.articleDetail,
    common : state.common,
    user : state.authUser.user,
    profile : state.authUser.profile,
    authUser : state.authUser
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);