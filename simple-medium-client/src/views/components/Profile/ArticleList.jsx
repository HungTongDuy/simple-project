import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

import { 
    ROUTE_ARTICLE_VIEW,
    API_CLIENT_URL
} from '../../../core/constants';
import { formatDate, formatTitle } from '../../../core/utils';
import { Button } from '@material-ui/core';

class ArticleList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        const profile = this.props.profile;
        const user = profile.user;
        const articles = profile.articles;
        console.log('articles', articles);

        let n = profile.user.email.lastIndexOf('@');
        let user_key = profile.user.email.slice(0, n);
        let href = API_CLIENT_URL + "/profile/@" + user_key + "/" + profile.user._id + "/";

        

        return (
            <div className="article-list">
                {articles.map((article, key) => {
                    let href_article = API_CLIENT_URL + '/article/editor/' + article._id + '/';
                    return(
                        <Grid item key={key} xs={12} sm={12} className="article-item">
                            <div className="user-info">
                                <div item className="avatar-image--small">
                                    <a className="link" href={href}>
                                        <img className="link" src={user.provider_pic.url} title={user.name} />
                                    </a>
                                </div>
                                <div item>
                                    <a className="link" href={href}>
                                        <span className="user-name">{user.name}</span>
                                    </a>
                                    <time dateTime={user.createdAt}>{formatDate(user.createdAt)}</time>
                                </div>
                                <div className="user-follow">
                                    <ButtonEdit url={href_article} />
                                </div>
                            </div>
                            <div className="article-info">
                                <div className="feature-img">
                                    <a className="link" href={ROUTE_ARTICLE_VIEW + formatTitle(article.title) + '-' + article._id }>
                                        <img className="link" src={article.feature_img.url} title={article.title}/>
                                    </a>
                                </div>
                                <div className="article-title">
                                    <a className="link" href={ROUTE_ARTICLE_VIEW + formatTitle(article.title) + '-' + article._id }>
                                        {article.title}
                                    </a>
                                </div>
                                <div className="content" dangerouslySetInnerHTML={{__html: article.text.substr(0, 280)}}>
                                </div>
                            </div>
                        </Grid>
                    )
                })}
            </div>
        )
    }
}

const ButtonEdit = (props) => {
    return (
        <span className="followState js-followState" data-user-id="">
            <a href={props.url + "edit"} className="link">
                <button className={" button button--primary button--smallest u-noUserSelect button--withChrome u-accentColor--buttonNormal button--follow js-followButton u-marginLeft10 u-xs-hide"} data-action="sign-up-prompt" data-sign-in-action="toggle-subscribe-user" data-requires-token="true" data-redirect="https://medium.com/_/subscribe/user/3299ebce81f1" data-action-source="post_header_lockup-3299ebce81f1-------------------------follow_byline">
                    <span className="button-label  button-defaultState">Edit Article</span>
                </button>
            </a>
        </span>
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

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);