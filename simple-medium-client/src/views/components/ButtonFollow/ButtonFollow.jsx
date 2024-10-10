import React from 'react';
import { connect } from 'react-redux';

import { followUser, toggleDialogOpen } from '../../../core/actions';

import './ButtonFollow.css';

class ButtonFollow extends React.Component {
    constructor(props){
        super(props);

        this.followUser = this.followUser.bind(this);
    }

    followUser() {
        console.log('followUser');
        // if(localStorage.Auth) {
        //     console.log('followUser');
        //     const articleDetail = this.props.articleDetail;
        //     const user = this.props.user;
        //     var pathname = this.props.location.pathname;
        //     var n = pathname.lastIndexOf('-');
        //     var id = pathname.slice(n + 1, pathname.length);
        //     this.props.followUser(user._id, articleDetail.author._id);
        // } else {
        //     this.props.toggleDialogOpen({ signIn: true, signUp: false });
        // }
    }

    render() {
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
}

const mapDispatchToProps = (dispatch) => {
    return ({
        followUser: (id, userId) => dispatch(followUser(id, userId)),
        toggleDialogOpen: data => dispatch(toggleDialogOpen(data))
    })
}

const mapStateToProps = (state) =>({
    articleDetail: state.home.articleDetail,
    common : state.common,
    user : state.authUser.user,
    profile : state.authUser.profile
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonFollow);