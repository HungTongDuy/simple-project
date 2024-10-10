import React from 'react';
import { connect } from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import { formatDate } from '../../../core/utils';

import { postComment, toggleDialogOpen, clap_comment } from '../../../core/actions';

import SnackbarNotification from '../../components/SnackbarNotification';

class CommentContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            textComment: ''
        }

        this.postComment = this.postComment.bind(this);
        this.changeTextComment = this.changeTextComment.bind(this);
        this.clapComment = this.clapComment.bind(this);
    }

    postComment() {
        console.log('this.postComment');
        if(localStorage.Auth) {
            const articleDetail = this.props.articleDetail;
            const user = this.props.user;
            this.props.postComment(articleDetail._id, user._id, this.state.textComment);
            this.setState({
                textComment: ''
            })
        } else {
            this.props.toggleDialogOpen({ signIn: true, signUp: false });
        }
    }

    changeTextComment(e) {
        console.log(e.target.value);
        this.setState({
            textComment: e.target.value
        })
    }

    clapComment(_id) {
        this.props.clap_comment(this.props.articleDetail._id, _id);
    }

    render() {
        const articleDetail = this.props.articleDetail;
        const user = this.props.user;
        
        return(
            <div className="u-maxWidth740 u-padding0 u-clearfix u-backgroundGrayLightest u-print-hide supplementalPostContent js-responsesWrapper" data-action-scope="_actionscope_5">
                <div className="responsesStreamWrapper js-responsesStreamWrapper">
                    {/*----------herder comment-----------*/}
                    <div className="responsesStream-title u-paddingTop15">
                        <div className="row">
                            <header className="heading">
                                <div className="u-clearfix">
                                    <div className="heading-content u-floatLeft"><span className="heading-title heading-title--semibold">Responses</span></div>
                                </div>
                            </header>
                        </div>
                    </div> 
                    {/*----------start editor comment-----------*/}
                    <div className="responsesStream-editor postArticle-content cardChromeless u-marginBottom20 u-paddingLeft20 u-paddingRight20 js-responsesStreamEditor">
                        <div className="inlineNewPostControl js-inlineNewPostControl" data-action-scope="_actionscope_26">
                            <div className="comment-form__write has-avatar">
                                <a href="#" className="">
                                    <Avatar alt={"Go to the profile of " + user.name} src={user.provider_pic} className="avatar-comment avatar--md mx-05" /> 
                                </a>
                                <div className="editor-lite" name="comment_contents" placeholder="Write a response..." rows="1">
                                    <textarea onChange={this.changeTextComment} className="graf graf--p" name="comment_contents" placeholder="Write a response..." rows="1"></textarea>
                                </div>
                            </div>
                            <div className="comment-form__actions">
                                <Button 
                                    onClick={this.postComment}
                                    variant="contained" 
                                    className="btn btn-primary float-right publish-button" 
                                    color="primary" >
                                    Post Comment
                                </Button>
                            </div>
                        </div>
                    </div>
                    {/*----------end editor comment-----------*/}
                    {/*----------start comment list-----------*/}
                    <div className="responsesStream js-responsesStream">
                        {articleDetail.comments.map((item, key) => {
                            return (
                                    <CommentItem key={key} clapComment={this.clapComment} comment={item} />
                            );
                        })}
                        

                    </div>
                    {/*----------end comment list-----------*/}
                    {/*----------start "show all comment"-----------*/}
                    {/* <div className="u-maxWidth740 js-showOtherResponses">
                        <button className="button button--primary button--withChrome u-accentColor--buttonNormal responsesStream-showOtherResponses cardChromeless u-sizeFullWidth u-marginVertical20 u-heightAuto is-touched" data-action="show-other-responses">Show all responses</button>
                    </div> */}
                    {/*----------end "show all comment"-----------*/}
                    <SnackbarNotification />
                </div>
            </div>
        );
    }
}

const CommentItem = (props) => {
    let url = '';
    let comment = props.comment;
    console.log('comment', comment);
    if(comment.author != undefined && Object.keys(comment.author).length > 0) {
        let n = comment.author.email.lastIndexOf('@');
        let user_key = comment.author.email.slice(0, n);
        url = "/profile/@" + user_key + "/" + comment.author._id + "/";
    }
    return (
        <div className="streamItem streamItem--postPreview js-streamItem" data-action-scope="_actionscope_6">
            <div className="cardChromeless u-marginTop20 u-paddingTop10 u-paddingBottom15 u-paddingLeft20 u-paddingRight20">
                <div className="postArticle postArticle--short js-postArticle js-trackedPost" data-post-id="e2d73fd7c130" data-source="responses---------0-31--------------------" data-action-scope="_actionscope_7" data-scroll="native">
                    {/* <div className="u-marginBottom10">
                        <div className="postMetaInline">Applause from <a className="link link--darken u-accentColor--textDarken u-baseColor--link" href="https://medium.com/@tashian" data-action="show-user-card" data-action-value="3299ebce81f1" data-action-type="hover" data-user-id="3299ebce81f1" dir="auto">Carl Tashian</a> (author)</div>
                    </div> */}
                    <div className="u-clearfix u-marginBottom15 u-paddingTop5">
                        <div className="postMetaInline u-floatLeft">
                            <div className="u-flexCenter">
                                <div className="postMetaInline-avatar u-flex0">
                                    <a className="link u-baseColor--link avatar" href={url} data-action="show-user-card" data-action-value="f55b78ed1d0c" data-action-type="hover" data-user-id="f55b78ed1d0c" dir="auto">
                                        <Avatar src={comment.author.provider_pic} className="avatar-image u-size36x36 u-xs-size32x32" alt={"Go to the profile of " + comment.author.name} />
                                    </a>
                                </div>
                                <div className="postMetaInline postMetaInline-authorLockup ui-captionStrong u-flex1 u-noWrapWithEllipsis">
                                    <a className="ds-link ds-link--styleSubtle link link--darken link--accent u-accentColor--textNormal u-accentColor--textDarken" href={url} >
                                        {comment.author.name}
                                    </a>
                                    <div className="ui-caption u-fontSize12 u-baseColor--textNormal u-textColorNormal js-postMetaInlineSupplemental">
                                        <a className="link link--darken" href={url} data-action="open-post" data-action-value={url} data-action-source="preview-listing">
                                            <time dateTime="2016-04-24T03:06:00.466Z">{formatDate(comment.createdAt)}</time>
                                        </a><span className="middotDivider u-fontSize12"></span>
                                        {/* <span className="readingTime" title="1 min read"></span> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="js-inlineExpandBody comment-text">
                        <a className="" href={url} data-action="expand-inline">
                            <div className="postArticle-content js-postField">
                                <section className="section section--body section--first section--last">
                                    <div className="section-divider">
                                        <hr className="section-divider" />
                                    </div>
                                    <div className="section-content">
                                        <div className="section-inner sectionLayout--insetColumn">
                                            <p name="ba6f" id="ba6f" className="graf graf--p graf--leading graf--trailing">
                                                {comment.text}
                                            </p>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </a>
                    </div>
                    <div className="postArticle-readMore">
                        {/* <button className="button button--smaller button--link u-baseColor--buttonNormal" data-action="expand-inline">Read more…</button> */}
                    </div>
                    <div className="u-clearfix u-paddingTop10 u-marginLeft10">
                        <div className="u-floatLeft">
                            <div className="multirecommend js-actionMultirecommend u-flexCenter" data-post-id="e2d73fd7c130" data-is-flush-left="true" data-source="listing-----e2d73fd7c130---------------------clap_preview">
                                <div className="u-relative u-foreground">
                                    <button onClick={() => props.clapComment(comment._id)} className="button button--primary button--chromeless u-accentColor--buttonNormal button--withIcon button--withSvgIcon clapButton js-actionMultirecommendButton" data-action="multivote" data-action-value="e2d73fd7c130" data-action-type="long-press" data-action-source="listing-----e2d73fd7c130---------------------clap_preview" aria-label="Clap">
                                    <span className="button-defaultState">
                                        <span className="svgIcon svgIcon--clap svgIcon--25px is-flushLeft">
                                            <svg className="svgIcon-use" width="25" height="25" viewBox="0 0 25 25">
                                                <g fillRule="evenodd">
                                                    <path d="M11.739 0l.761 2.966L13.261 0z"></path>
                                                    <path d="M14.815 3.776l1.84-2.551-1.43-.471z"></path>
                                                    <path d="M8.378 1.224l1.84 2.551L9.81.753z"></path>
                                                    <path d="M20.382 21.622c-1.04 1.04-2.115 1.507-3.166 1.608.168-.14.332-.29.492-.45 2.885-2.886 3.456-5.982 1.69-9.211l-1.101-1.937-.955-2.02c-.315-.676-.235-1.185.245-1.556a.836.836 0 0 1 .66-.16c.342.056.66.28.879.605l2.856 5.023c1.179 1.962 1.379 5.119-1.6 8.098m-13.29-.528l-5.02-5.02a1 1 0 0 1 .707-1.701c.255 0 .512.098.707.292l2.607 2.607a.442.442 0 0 0 .624-.624L4.11 14.04l-1.75-1.75a.998.998 0 1 1 1.41-1.413l4.154 4.156a.44.44 0 0 0 .624 0 .44.44 0 0 0 0-.624l-4.152-4.153-1.172-1.171a.998.998 0 0 1 0-1.41 1.018 1.018 0 0 1 1.41 0l1.172 1.17 4.153 4.152a.437.437 0 0 0 .624 0 .442.442 0 0 0 0-.624L6.43 8.222a.988.988 0 0 1-.291-.705.99.99 0 0 1 .29-.706 1 1 0 0 1 1.412 0l6.992 6.993a.443.443 0 0 0 .71-.501l-1.35-2.856c-.315-.676-.235-1.185.246-1.557a.85.85 0 0 1 .66-.16c.342.056.659.28.879.606L18.628 14c1.573 2.876 1.067 5.545-1.544 8.156-1.396 1.397-3.144 1.966-5.063 1.652-1.713-.286-3.463-1.248-4.928-2.714zM10.99 5.976l2.562 2.562c-.497.607-.563 1.414-.155 2.284l.265.562-4.257-4.257a.98.98 0 0 1-.117-.445c0-.267.104-.517.292-.706a1.023 1.023 0 0 1 1.41 0zm8.887 2.06c-.375-.557-.902-.916-1.486-1.011a1.738 1.738 0 0 0-1.342.332c-.376.29-.61.656-.712 1.065a2.1 2.1 0 0 0-1.095-.562 1.776 1.776 0 0 0-.992.128l-2.636-2.636a1.883 1.883 0 0 0-2.658 0 1.862 1.862 0 0 0-.478.847 1.886 1.886 0 0 0-2.671-.012 1.867 1.867 0 0 0-.503.909c-.754-.754-1.992-.754-2.703-.044a1.881 1.881 0 0 0 0 2.658c-.288.12-.605.288-.864.547a1.884 1.884 0 0 0 0 2.659l.624.622a1.879 1.879 0 0 0-.91 3.16l5.019 5.02c1.595 1.594 3.515 2.645 5.408 2.959a7.16 7.16 0 0 0 1.173.098c1.026 0 1.997-.24 2.892-.7.279.04.555.065.828.065 1.53 0 2.969-.628 4.236-1.894 3.338-3.338 3.083-6.928 1.738-9.166l-2.868-5.043z"></path>
                                                </g>
                                            </svg>
                                        </span>
                                    </span>
                                    <span className="button-activeState">
                                        <span className="svgIcon svgIcon--clapFilled svgIcon--25px is-flushLeft">
                                            <svg className="svgIcon-use" width="25" height="25" viewBox="0 0 25 25">
                                                <g fillRule="evenodd">
                                                    <path d="M11.738 0l.762 2.966L13.262 0z"></path>
                                                    <path d="M16.634 1.224l-1.432-.47-.408 3.022z"></path>
                                                    <path d="M9.79.754l-1.431.47 1.84 2.552z"></path>
                                                    <path d="M22.472 13.307l-3.023-5.32c-.287-.426-.689-.705-1.123-.776a1.16 1.16 0 0 0-.911.221c-.297.231-.474.515-.535.84.017.022.036.04.053.063l2.843 5.001c1.95 3.564 1.328 6.973-1.843 10.144a8.46 8.46 0 0 1-.549.501c1.205-.156 2.328-.737 3.351-1.76 3.268-3.268 3.041-6.749 1.737-8.914"></path>
                                                    <path d="M12.58 9.887c-.156-.83.096-1.569.692-2.142L10.78 5.252c-.5-.504-1.378-.504-1.879 0-.178.18-.273.4-.329.63l4.008 4.005z"></path>
                                                    <path d="M15.812 9.04c-.218-.323-.539-.55-.88-.606a.814.814 0 0 0-.644.153c-.176.137-.713.553-.24 1.566l1.43 3.025a.539.539 0 1 1-.868.612L7.2 6.378a.986.986 0 1 0-1.395 1.395l4.401 4.403a.538.538 0 1 1-.762.762L5.046 8.54 3.802 7.295a.99.99 0 0 0-1.396 0 .981.981 0 0 0 0 1.394L3.647 9.93l4.402 4.403a.537.537 0 0 1 0 .761.535.535 0 0 1-.762 0L2.89 10.696a.992.992 0 0 0-1.399-.003.983.983 0 0 0 0 1.395l1.855 1.854 2.763 2.765a.538.538 0 0 1-.76.761l-2.765-2.764a.982.982 0 0 0-1.395 0 .989.989 0 0 0 0 1.395l5.32 5.32c3.371 3.372 6.64 4.977 10.49 1.126C19.74 19.8 20.271 17 18.62 13.982L15.812 9.04z"></path>
                                                </g>
                                            </svg>
                                        </span>
                                    </span>
                                    </button>
                                </div>
                                <span className="u-textAlignCenter u-relative u-background js-actionMultirecommendCount u-marginLeft5">
                                    <button className="button button--chromeless u-baseColor--buttonNormal js-multirecommendCountButton u-disablePointerEvents" data-action="show-recommends" data-action-value="e2d73fd7c130">
                                        {comment.claps}
                                    </button>
                                </span>
                            </div>
                        </div>
                        <div className="buttonSet u-floatRight"><a className="button button--chromeless u-baseColor--buttonNormal" href="" data-action-source="">4 responses</a>
                            <button className="button button--chromeless is-touchIconFadeInPulse u-baseColor--buttonNormal button--withIcon button--withSvgIcon button--bookmark js-bookmarkButton" title="Bookmark this story to read later" aria-label="Bookmark this story to read later" data-action="add-to-bookmarks" data-action-value="e2d73fd7c130" data-action-source=""><span className="button-defaultState"><span className="svgIcon svgIcon--bookmark svgIcon--25px"><svg className="svgIcon-use" width="25" height="25" viewBox="0 0 25 25"><path d="M19 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 16.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V6zm-6.838 9.97L7 19.636V6c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v13.637l-5.162-3.668a.49.49 0 0 0-.676 0z" fillRule="evenodd"></path></svg></span></span><span className="button-activeState"><span className="svgIcon svgIcon--bookmarkFilled svgIcon--25px"><svg className="svgIcon-use" width="25" height="25" viewBox="0 0 25 25"><path d="M19 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 16.85l5.662 4.126c.205.183.52.17.708-.03a.5.5 0 0 0 .118-.285H19V6z"></path></svg></span></span>
                            </button>
                            <button className="button button--chromeless is-touchIconBlackPulse u-baseColor--buttonNormal button--withIcon button--withSvgIcon js-postActionsButton" data-action="post-actions" data-action-value="e2d73fd7c130"><span className="svgIcon svgIcon--arrowDown svgIcon--19px is-flushRight"><svg className="svgIcon-use" width="19" height="19" viewBox="0 0 19 19">
                            <path d="M3.9 6.772l5.205 5.756.427.472.427-.472 5.155-5.698-.854-.772-4.728 5.254L4.753 6z" fillRule="evenodd"></path></svg></span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapDispatchtoProps = (dispatch) => {
    return({
        postComment: (articleId, authorId, comment) => dispatch(postComment(articleId, authorId, comment)),
        toggleDialogOpen: data => dispatch(toggleDialogOpen(data)),
        clap_comment: (article_id, comment_id) => dispatch(clap_comment(article_id, comment_id))
    })
}

const mapStateToProps = (state) =>({
    articleDetail: state.home.articleDetail,
    user : state.authUser.user
});

export default connect(mapStateToProps,mapDispatchtoProps)(CommentContent);