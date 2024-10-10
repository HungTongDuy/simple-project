import React from 'react';

import facebook_img from './facebook.png';

class FacebookLogin extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }

        this.facebookLogin = this.facebookLogin.bind(this);
        this.statusChangeCallback = this.statusChangeCallback.bind(this);
        this.fetchDataFacebook = this.fetchDataFacebook.bind(this);
    }

    componentDidMount() {
        window.fbAsyncInit = function() {
            FB.init({
            appId      : '308747443230320',
            cookie     : true,
            xfbml      : true,
            version    : 'v3.1'
            });
            
            FB.AppEvents.logPageView();   
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    facebookLogin() {
        FB.getLoginStatus(
            function(resp){
                this.statusChangeCallback(resp);
            }.bind(this),{ scope : 'email,user_work_history,user_education_history,user_location,public_profile' }
        )
    }

    statusChangeCallback(response) {
        console.log('statusChangeCallback');
        console.log(response);
        if (response.status === 'connected') {
            alert( "Connected to facebook. Retriving user from fb" );
            // Logged into your app and Facebook.
            this.fetchDataFacebook();
        } else if (response.status === 'not_authorized') {
            console.log('Import error', 'Authorize app to import data', 'error')
        } else {
            console.log('Import error', 'Error occured while importing data', 'error')
        }
    }

    fetchDataFacebook() {
        console.log('Welcome!  Fetching your information.... ');

        window.FB.api('/me', function(user) {
            console.log( user );
            console.log('Successful login from facebook : ' + user.name);
            alert( 'Successful login for: ' + user.name );
        });
    }

    render() {
        return (
            <img src={facebook_img} title="facebook login" alt="facebook" onClick={this.facebookLogin} />
        )
    }

}

export default FacebookLogin;