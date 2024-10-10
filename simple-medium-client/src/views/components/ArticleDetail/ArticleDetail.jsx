import React from 'react';
import { connect } from 'react-redux';
import FacebookProvider, { Share } from 'react-facebook';
import { TwitterShareButton } from 'react-share';

import { getArticleDetail, clapArticle, followUser, toggleDialogOpen } from '../../../core/actions';

import { formatDate, formatTitle } from '../../../core/utils';
import { FACEBOOK_APP_ID, ROUTE_ARTICLE_VIEW } from '../../../core/constants';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import './ArticleDetail.css';
import CommentContent from './CommentContent';

import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';

class ArticleDetail extends React.Component {

    constructor(props) {
        super(props);

        this.clapArticle = this.clapArticle.bind(this);
        this.followUser = this.followUser.bind(this);
        this.classActiceFollowing = this.classActiceFollowing.bind(this);
    }

    componentWillMount() {
        var pathname = this.props.location.pathname;
        var n = pathname.lastIndexOf('-');
        var id = pathname.slice(n + 1, pathname.length);
        this.props.getArticleDetail(id);
    }

    clapArticle() {
        if(localStorage.Auth) {
            var pathname = this.props.location.pathname;
            var n = pathname.lastIndexOf('-');
            var id = pathname.slice(n + 1, pathname.length);
            this.props.clapArticle(id);
        } else {
            this.props.toggleDialogOpen({ signIn: true, signUp: false });
        }
    }

    followUser() {
        if(localStorage.Auth) {
            console.log('followUser');
            const articleDetail = this.props.articleDetail;
            const user = this.props.user;
            var pathname = this.props.location.pathname;
            var n = pathname.lastIndexOf('-');
            var id = pathname.slice(n + 1, pathname.length);
            this.props.followUser(user._id, articleDetail.author._id);
        } else {
            this.props.toggleDialogOpen({ signIn: true, signUp: false });
        }
    }

    classActiceFollowing() {
        const articleDetail = this.props.articleDetail;
        const user = this.props.user;
        let classActiceFollowing = "";
        // console.log('user', user);
        //if(articleDetail != undefined || articleDetail != null) {
            if(user.following.indexOf(articleDetail.author._id) > -1) {
                classActiceFollowing = "is-active";
            }
        //}
        return classActiceFollowing;
    }
    
    render() {
        //console.log('this.props.articleDetail----', this.props.articleDetail);

        const articleDetail = this.props.articleDetail;
        const user = this.props.user;
        // console.log('articleDetail', articleDetail);
        // console.log('user--- ', user);

        if(articleDetail == undefined || articleDetail == null) {
            return (
                <article className=" u-minHeight100vhOffset65 u-overflowHidden postArticle postArticle--full is-withAccentColors u-marginBottom40" lang="en">
                </article>
            )
        }
        
        //const classActiceFollowing = this.classActiceFollowing;
        let classActiceFollowing = "";
        if(Object.keys(user).length > 0 && user.following.indexOf(articleDetail.author._id) > -1) {
            classActiceFollowing = "is-active";
        }

        var n = articleDetail.author.email.lastIndexOf('@');
        var user_key = articleDetail.author.email.slice(0, n);
        var href= "/profile/@" + user_key + "/" + articleDetail.author._id + "/";

        return (
            <article className=" u-minHeight100vhOffset65 u-overflowHidden postArticle postArticle--full is-withAccentColors u-marginBottom40" lang="en">
                {/*-----------start header page ariticle view----------*/}
                {/* <header className="u-maxWidth740 postMetaHeader">
                    <div className="uiScale uiScale-ui--regular uiScale-caption--regular u-paddingBottom10 row">
                        <div className="col u-size12of12 js-postMetaLockup">
                            <div className="uiScale uiScale-ui--regular uiScale-caption--regular postMetaLockup postMetaLockup--authorWithBio u-flexCenter js-postMetaLockup">
                                <div className="u-flex0">
                                    <a className="link u-baseColor--link avatar is-touched" href={href} data-action="show-user-card" data-action-source="post_header_lockup" data-action-value="" data-action-type="hover" data-user-id="" dir="auto">
                                        <Avatar alt={"Go to the profile of " + articleDetail.author.name} src={articleDetail.author.provider_pic.url} className="avatar-image avatar-image--small" /> 
                                    </a>
                                </div>
                                <div className="u-flex1 u-paddingLeft15 u-overflowHidden">
                                    <div className="u-lineHeightTightest">
                                        <a className="ds-link ds-link--styleSubtle u-inlineBlock link link--darken link--darker" href={href} data-action="show-user-card" data-action-source="post_header_lockup" data-action-value="3299ebce81f1" data-action-type="hover" data-user-id="3299ebce81f1" data-collection-slug="free-code-camp" dir="auto">
                                            {articleDetail.author.name}
                                        </a>
                                        <span className="followState js-followState" data-user-id="">
                                            <button className="button button--smallest u-noUserSelect button--withChrome u-baseColor--buttonNormal button--withHover button--unblock js-unblockButton u-marginLeft10 u-xs-hide" data-action="sign-up-prompt" data-sign-in-action="toggle-block-user" data-requires-token="true" data-redirect="https://medium.freecodecamp.org/the-art-of-computer-programming-by-donald-knuth-82e275c8764f" data-action-source="post_header_lockup">
                                                <span className="button-label  button-defaultState">Blocked</span>
                                                <span className="button-label button-hoverState">Unblock</span>
                                            </button>
                                            <button onClick={this.followUser} className={classActiceFollowing + " button button--primary button--smallest u-noUserSelect button--withChrome u-accentColor--buttonNormal button--follow js-followButton u-marginLeft10 u-xs-hide"} data-action="sign-up-prompt" data-sign-in-action="toggle-subscribe-user" data-requires-token="true" data-redirect="https://medium.com/_/subscribe/user/3299ebce81f1" data-action-source="post_header_lockup-3299ebce81f1-------------------------follow_byline">
                                                <span className="button-label  button-defaultState">Follow</span>
                                                <span className="button-label button-activeState">Following</span>
                                            </button>
                                        </span>
                                    </div>
                                    <div className="ui-caption postMetaInline js-testPostMetaInlineSupplemental">
                                        <time dateTime={articleDetail.createdAt}>{formatDate(articleDetail.createdAt)}</time>
                                        <span className="middotDivider u-fontSize12"></span>
                                        <span className="readingTime" title="5 min read"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header> */}
                {/*-----------end header page ariticle view----------*/}
                {/*-----------start content ariticle view----------*/}
                <div className="postArticle-content js-postField js-notesSource js-trackedPost" data-post-id="82e275c8764f" data-source="post_page" data-collection-id="336d898217ee" data-tracking-context="postPage" data-scroll="native">
                    <section name="6da4" className="section section--body section--first">
                        <div className="section-content">
                            <div className="section-inner sectionLayout--insetColumn">
                                <h1 id={articleDetail._id} id={articleDetail._id} className="graf graf--h3 graf--startsWithSingleQuote graf--leading graf--title">
                                    {articleDetail.title ? articleDetail.title : ''}
                                </h1>
                                <figure id={articleDetail._id} className="graf graf--figure graf-after--h3">
                                    <div className="aspectRatioPlaceholder is-locked" >
                                        <div className="aspectRatioPlaceholder-fill" ></div>
                                        <div className="progressiveMedia js-progressiveMedia graf-image is-canvasLoaded is-imageLoaded" data-image-id="1*IJlgGsOIpq0lKTdf6lZATA.png" data-width="1024" data-height="1024" data-focus-x="77" data-focus-y="26" data-action="zoom" data-action-value="1*IJlgGsOIpq0lKTdf6lZATA.png" data-scroll="native">
                                            <div className="js-progressiveMedia-inner">
                                                <img className="progressiveMedia-noscript js-progressiveMedia-inner" src={articleDetail.feature_img.url} />
                                            </div>
                                        </div>
                                    </div>
                                </figure>
                                
                                {/* <div className="graf graf--p">
                                    <FroalaEditorView model={articleDetail.text} /> 
                                </div> */}
                                <p className="graf graf--p" dangerouslySetInnerHTML={{__html: articleDetail.text}} />                                
                                {/* {this.parseFromString(articleDetail.text)} */}
                            </div>
                        </div>
                    </section>
                </div>
                {/*-----------end content ariticle view----------*/}
                <footer className="u-paddingTop10">
                    {/*-----------start button follow----------*/}
                    <div className="u-maxWidth740 postActions js-postActionsFooter">
                        <div className="u-flexCenter">
                            <div className="u-flex1">
                                <div className="multirecommend js-actionMultirecommend u-flexCenter u-width60" data-post-id="82e275c8764f" data-is-icon-29px="true" data-is-circle="true" data-has-recommend-list="true" data-source="post_actions_footer-----82e275c8764f---------------------clap_footer">
                                    <div className="u-relative u-foreground">
                                        <button className="button button--large button--circle button--withChrome u-baseColor--buttonNormal button--withIcon button--withSvgIcon clapButton js-actionMultirecommendButton clapButton--largePill u-relative u-foreground u-xs-paddingLeft13 u-width60 u-height60 u-accentColor--textNormal u-accentColor--buttonNormal clap-onboardingcollection" data-action="sign-up-prompt" data-sign-in-action="multivote" data-requires-token="true" data-redirect="https://medium.com/_/vote/p/82e275c8764f" data-action-source="post_actions_footer-----82e275c8764f---------------------clap_footer" aria-label="Clap">
                                            <span className="button-defaultState">
                                                <span className="svgIcon svgIcon--clap svgIcon--33px u-relative u-topNegative2 u-xs-top0">
                                                    <svg className="svgIcon-use" width="33" height="33" viewBox="0 0 33 33">
                                                    <path d="M28.86 17.342l-3.64-6.402c-.292-.433-.712-.729-1.163-.8a1.124 1.124 0 0 0-.889.213c-.63.488-.742 1.181-.33 2.061l1.222 2.587 1.4 2.46c2.234 4.085 1.511 8.007-2.145 11.663-.26.26-.526.49-.797.707 1.42-.084 2.881-.683 4.292-2.094 3.822-3.823 3.565-7.876 2.05-10.395zm-6.252 11.075c3.352-3.35 3.998-6.775 1.978-10.469l-3.378-5.945c-.292-.432-.712-.728-1.163-.8a1.122 1.122 0 0 0-.89.213c-.63.49-.742 1.182-.33 2.061l1.72 3.638a.502.502 0 0 1-.806.568l-8.91-8.91a1.335 1.335 0 0 0-1.887 1.886l5.292 5.292a.5.5 0 0 1-.707.707l-5.292-5.292-1.492-1.492c-.503-.503-1.382-.505-1.887 0a1.337 1.337 0 0 0 0 1.886l1.493 1.492 5.292 5.292a.499.499 0 0 1-.353.854.5.5 0 0 1-.354-.147L5.642 13.96a1.338 1.338 0 0 0-1.887 0 1.338 1.338 0 0 0 0 1.887l2.23 2.228 3.322 3.324a.499.499 0 0 1-.353.853.502.502 0 0 1-.354-.146l-3.323-3.324a1.333 1.333 0 0 0-1.886 0 1.325 1.325 0 0 0-.39.943c0 .356.138.691.39.943l6.396 6.397c3.528 3.53 8.86 5.313 12.821 1.353zM12.73 9.26l5.68 5.68-.49-1.037c-.518-1.107-.426-2.13.224-2.89l-3.303-3.304a1.337 1.337 0 0 0-1.886 0 1.326 1.326 0 0 0-.39.944c0 .217.067.42.165.607zm14.787 19.184c-1.599 1.6-3.417 2.392-5.353 2.392-.349 0-.7-.03-1.058-.082a7.922 7.922 0 0 1-3.667.887c-3.049 0-6.115-1.626-8.359-3.87l-6.396-6.397A2.315 2.315 0 0 1 2 19.724a2.327 2.327 0 0 1 1.923-2.296l-.875-.875a2.339 2.339 0 0 1 0-3.3 2.33 2.33 0 0 1 1.24-.647l-.139-.139c-.91-.91-.91-2.39 0-3.3.884-.884 2.421-.882 3.301 0l.138.14a2.335 2.335 0 0 1 3.948-1.24l.093.092c.091-.423.291-.828.62-1.157a2.336 2.336 0 0 1 3.3 0l3.384 3.386a2.167 2.167 0 0 1 1.271-.173c.534.086 1.03.354 1.441.765.11-.549.415-1.034.911-1.418a2.12 2.12 0 0 1 1.661-.41c.727.117 1.385.565 1.853 1.262l3.652 6.423c1.704 2.832 2.025 7.377-2.205 11.607zM13.217.484l-1.917.882 2.37 2.837-.454-3.719zm8.487.877l-1.928-.86-.44 3.697 2.368-2.837zM16.5 3.293L15.478-.005h2.044L16.5 3.293z" fillRule="evenodd">
                                                    </path>
                                                    </svg>
                                                </span>
                                            </span>
                                            <span className="button-activeState">
                                                <span className="svgIcon svgIcon--clapFilled svgIcon--33px u-relative u-topNegative2 u-xs-top0">
                                                    <svg className="svgIcon-use" width="33" height="33" viewBox="0 0 33 33">
                                                    <g fillRule="evenodd">
                                                        <path d="M29.58 17.1l-3.854-6.78c-.365-.543-.876-.899-1.431-.989a1.491 1.491 0 0 0-1.16.281c-.42.327-.65.736-.7 1.207v.001l3.623 6.367c2.46 4.498 1.67 8.802-2.333 12.807-.265.265-.536.505-.81.728 1.973-.222 3.474-1.286 4.45-2.263 4.166-4.165 3.875-8.6 2.215-11.36zm-4.831.82l-3.581-6.3c-.296-.439-.725-.742-1.183-.815a1.105 1.105 0 0 0-.89.213c-.647.502-.755 1.188-.33 2.098l1.825 3.858a.601.601 0 0 1-.197.747.596.596 0 0 1-.77-.067L10.178 8.21c-.508-.506-1.393-.506-1.901 0a1.335 1.335 0 0 0-.393.95c0 .36.139.698.393.95v.001l5.61 5.61a.599.599 0 1 1-.848.847l-5.606-5.606c-.001 0-.002 0-.003-.002L5.848 9.375a1.349 1.349 0 0 0-1.902 0 1.348 1.348 0 0 0 0 1.901l1.582 1.582 5.61 5.61a.6.6 0 0 1-.848.848l-5.61-5.61c-.51-.508-1.393-.508-1.9 0a1.332 1.332 0 0 0-.394.95c0 .36.139.697.393.952l2.363 2.362c.002.001.002.002.002.003l3.52 3.52a.6.6 0 0 1-.848.847l-3.522-3.523h-.001a1.336 1.336 0 0 0-.95-.393 1.345 1.345 0 0 0-.949 2.295l6.779 6.78c3.715 3.713 9.327 5.598 13.49 1.434 3.527-3.528 4.21-7.13 2.086-11.015zM11.817 7.727c.06-.328.213-.64.466-.893.64-.64 1.755-.64 2.396 0l3.232 3.232c-.82.783-1.09 1.833-.764 2.992l-5.33-5.33z">
                                                        </path>
                                                        <path d="M13.285.48l-1.916.881 2.37 2.837z"></path>
                                                        <path d="M21.719 1.361L19.79.501l-.44 3.697z"></path>
                                                        <path d="M16.502 3.298L15.481 0h2.043z"></path>
                                                    </g>
                                                    </svg>
                                                </span>
                                            </span>
                                        </button>
                                        <div className="clapUndo u-width60 u-round u-height32 u-absolute u-borderBox u-paddingRight5 u-transition--transform200Spring u-background--brandSageLighter js-clapUndo">
                                            <button className="button button--chromeless u-baseColor--buttonNormal button--withIcon button--withSvgIcon u-floatRight" data-action="multivote-undo" data-action-value="82e275c8764f"><span className="svgIcon svgIcon--removeThin svgIcon--29px"><svg className="svgIcon-use" width="29" height="29" viewBox="0 0 29 29"><path d="M20.13 8.11l-5.61 5.61-5.609-5.61-.801.801 5.61 5.61-5.61 5.61.801.8 5.61-5.609 5.61 5.61.8-.801-5.609-5.61 5.61-5.61" fillRule="evenodd"></path></svg></span></button>
                                        </div>
                                    </div><span className="u-textAlignCenter u-relative u-background js-actionMultirecommendCount u-marginLeft10"><button className="button button--chromeless u-baseColor--buttonNormal js-multirecommendCountButton" data-action="show-recommends" data-action-value="82e275c8764f">{articleDetail.claps}</button></span></div>
                            </div>
                            <div className="buttonSet u-flex0">
                                <button className="button button--large button--dark button--chromeless is-touchIconBlackPulse u-baseColor--buttonDark button--withIcon button--withSvgIcon" data-action="scroll-to-responses" data-action-source="post_actions_footer">
                                    <span className="svgIcon svgIcon--response svgIcon--29px">
                                        <svg className="svgIcon-use" width="29" height="29" viewBox="0 0 29 29">
                                        <path d="M21.27 20.058c1.89-1.826 2.754-4.17 2.754-6.674C24.024 8.21 19.67 4 14.1 4 8.53 4 4 8.21 4 13.384c0 5.175 4.53 9.385 10.1 9.385 1.007 0 2-.14 2.95-.41.285.25.592.49.918.7 1.306.87 2.716 1.31 4.19 1.31.276-.01.494-.14.6-.36a.625.625 0 0 0-.052-.65c-.61-.84-1.042-1.71-1.282-2.58a5.417 5.417 0 0 1-.154-.75zm-3.85 1.324l-.083-.28-.388.12a9.72 9.72 0 0 1-2.85.424c-4.96 0-8.99-3.706-8.99-8.262 0-4.556 4.03-8.263 8.99-8.263 4.95 0 8.77 3.71 8.77 8.27 0 2.25-.75 4.35-2.5 5.92l-.24.21v.32c0 .07 0 .19.02.37.03.29.1.6.19.92.19.7.49 1.4.89 2.08-.93-.14-1.83-.49-2.67-1.06-.34-.22-.88-.48-1.16-.74z">
                                        </path>
                                        </svg>
                                    </span>
                                </button>
                                <button className="button button--chromeless u-baseColor--buttonNormal" data-action="scroll-to-responses">{articleDetail.comments.length}</button>
                                <button className="button button--large button--dark button--chromeless is-touchIconBlackPulse u-baseColor--buttonDark button--withIcon button--withSvgIcon u-xs-hide" title="Share on Twitter" aria-label="Share on Twitter" data-action="share-on-twitter" data-action-source="post_actions_footer">
                                    <TwitterShareButton title="Twitter" url={ROUTE_ARTICLE_VIEW + formatTitle(articleDetail.title) + '-' + articleDetail._id }>                                
                                        <span className="svgIcon svgIcon--twitter svgIcon--29px">
                                            <svg className="svgIcon-use" width="29" height="29" viewBox="0 0 29 29">
                                            <path d="M21.967 11.8c.018 5.93-4.607 11.18-11.177 11.18-2.172 0-4.25-.62-6.047-1.76l-.268.422-.038.5.186.013.168.012c.3.02.44.032.6.046 2.06-.026 3.95-.686 5.49-1.86l1.12-.85-1.4-.048c-1.57-.055-2.92-1.08-3.36-2.51l-.48.146-.05.5c.22.03.48.05.75.08.48-.02.87-.07 1.25-.15l2.33-.49-2.32-.49c-1.68-.35-2.91-1.83-2.91-3.55 0-.05 0-.01-.01.03l-.49-.1-.25.44c.63.36 1.35.57 2.07.58l1.7.04L7.4 13c-.978-.662-1.59-1.79-1.618-3.047a4.08 4.08 0 0 1 .524-1.8l-.825.07a12.188 12.188 0 0 0 8.81 4.515l.59.033-.06-.59v-.02c-.05-.43-.06-.63-.06-.87a3.617 3.617 0 0 1 6.27-2.45l.2.21.28-.06c1.01-.22 1.94-.59 2.73-1.09l-.75-.56c-.1.36-.04.89.12 1.36.23.68.58 1.13 1.17.85l-.21-.45-.42-.27c-.52.8-1.17 1.48-1.92 2L22 11l.016.28c.013.2.014.35 0 .52v.04zm.998.038c.018-.22.017-.417 0-.66l-.498.034.284.41a8.183 8.183 0 0 0 2.2-2.267l.97-1.48-1.6.755c.17-.08.3-.02.34.03a.914.914 0 0 1-.13-.292c-.1-.297-.13-.64-.1-.766l.36-1.254-1.1.695c-.69.438-1.51.764-2.41.963l.48.15a4.574 4.574 0 0 0-3.38-1.484 4.616 4.616 0 0 0-4.61 4.613c0 .29.02.51.08.984l.01.02.5-.06.03-.5c-3.17-.18-6.1-1.7-8.08-4.15l-.48-.56-.36.64c-.39.69-.62 1.48-.65 2.28.04 1.61.81 3.04 2.06 3.88l.3-.92c-.55-.02-1.11-.17-1.6-.45l-.59-.34-.14.67c-.02.08-.02.16 0 .24-.01 2.12 1.55 4.01 3.69 4.46l.1-.49-.1-.49c-.33.07-.67.12-1.03.14-.18-.02-.43-.05-.64-.07l-.76-.09.23.73c.57 1.84 2.29 3.14 4.28 3.21l-.28-.89a8.252 8.252 0 0 1-4.85 1.66c-.12-.01-.26-.02-.56-.05l-.17-.01-.18-.01L2.53 21l1.694 1.07a12.233 12.233 0 0 0 6.58 1.917c7.156 0 12.2-5.73 12.18-12.18l-.002.04z">
                                            </path>
                                            </svg>
                                        </span>
                                    </TwitterShareButton>
                                </button>
                                <FacebookProvider appId={FACEBOOK_APP_ID}>
                                    <Share href={ROUTE_ARTICLE_VIEW + formatTitle(articleDetail.title) + '-' + articleDetail._id }>
                                        <button className="button button--large button--dark button--chromeless is-touchIconBlackPulse u-baseColor--buttonDark button--withIcon button--withSvgIcon u-xs-hide" title="Share on Facebook" aria-label="Share on Facebook" data-action="share-on-facebook" data-action-source="post_actions_footer">
                                            <span className="svgIcon svgIcon--facebook svgIcon--29px">
                                                <svg className="svgIcon-use" width="29" height="29" viewBox="0 0 29 29">
                                                <path d="M16.39 23.61v-5.808h1.846a.55.55 0 0 0 .546-.48l.36-2.797a.551.551 0 0 0-.547-.62H16.39V12.67c0-.67.12-.813.828-.813h1.474a.55.55 0 0 0 .55-.55V8.803a.55.55 0 0 0-.477-.545c-.436-.06-1.36-.116-2.22-.116-2.5 0-4.13 1.62-4.13 4.248v1.513H10.56a.551.551 0 0 0-.55.55v2.797c0 .304.248.55.55.55h1.855v5.76c-4.172-.96-7.215-4.7-7.215-9.1 0-5.17 4.17-9.36 9.31-9.36 5.14 0 9.31 4.19 9.31 9.36 0 4.48-3.155 8.27-7.43 9.15M14.51 4C8.76 4 4.1 8.684 4.1 14.46c0 5.162 3.75 9.523 8.778 10.32a.55.55 0 0 0 .637-.543v-6.985a.551.551 0 0 0-.55-.55H11.11v-1.697h1.855a.55.55 0 0 0 .55-.55v-2.063c0-2.02 1.136-3.148 3.03-3.148.567 0 1.156.027 1.597.06v1.453h-.924c-1.363 0-1.93.675-1.93 1.912v1.78c0 .3.247.55.55.55h2.132l-.218 1.69H15.84c-.305 0-.55.24-.55.55v7.02c0 .33.293.59.623.54 5.135-.7 9.007-5.11 9.007-10.36C24.92 8.68 20.26 4 14.51 4">
                                                </path>
                                                </svg>
                                            </span>
                                        </button>
                                    </Share>
                                </FacebookProvider>
                                <button className="button button--large button--dark button--chromeless u-baseColor--buttonDark button--withIcon button--withSvgIcon u-xs-show" title="Share this story on Twitter or Facebook" aria-label="Share this story on Twitter or Facebook" data-action="show-share-popover" data-action-source="post_actions_footer">
                                    <span className="svgIcon svgIcon--bookmark svgIcon--29px">
                                    <svg className="svgIcon-use" width="29" height="29" viewBox="0 0 29 29">
                                    <path d="M19.385 4h-9.77A2.623 2.623 0 0 0 7 6.615V23.01a1.022 1.022 0 0 0 1.595.847l5.905-4.004 5.905 4.004A1.022 1.022 0 0 0 22 23.011V6.62A2.625 2.625 0 0 0 19.385 4zM21 23l-5.91-3.955-.148-.107a.751.751 0 0 0-.884 0l-.147.107L8 23V6.615C8 5.725 8.725 5 9.615 5h9.77C20.275 5 21 5.725 21 6.615V23z" fillRule="evenodd"></path>
                                    </svg>
                                    </span>
                                    <span className="button-activeState"><span className="svgIcon svgIcon--bookmarkFilled svgIcon--29px"><svg className="svgIcon-use" width="29" height="29" viewBox="0 0 29 29"><path d="M19.385 4h-9.77A2.623 2.623 0 0 0 7 6.615V23.01a1.022 1.022 0 0 0 1.595.847l5.905-4.004 5.905 4.004A1.022 1.022 0 0 0 22 23.011V6.62A2.625 2.625 0 0 0 19.385 4z" fillRule="evenodd"></path></svg></span></span>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/*-----------end button follow----------*/}
                    {/*----------start follow user-----------*/}
                    {/* <div className="u-maxWidth740 u-paddingTop20 u-marginTop20 u-borderTopLightest container u-paddingBottom20 u-xs-paddingBottom10 js-postAttributionFooterContainer">
                        <div className="row js-postFooterInfo">
                            <div className="col u-size6of12 u-xs-size12of12">
                                <li className="uiScale uiScale-ui--small uiScale-caption--regular u-block u-paddingBottom18 js-cardUser">
                                    <div className="u-marginLeft20 u-floatRight">
                                        <span className="followState js-followState" data-user-id="3299ebce81f1">
                                            <button className="button button--small u-noUserSelect button--withChrome u-baseColor--buttonNormal button--withHover button--unblock js-unblockButton" data-action="sign-up-prompt" data-sign-in-action="toggle-block-user" data-requires-token="true" data-redirect="https://medium.freecodecamp.org/the-art-of-computer-programming-by-donald-knuth-82e275c8764f" data-action-source="footer_card">
                                                <span className="button-label  button-defaultState">Blocked</span>
                                                <span className="button-label button-hoverState">Unblock</span>
                                            </button>
                                            <button onClick={this.followUser} className={classActiceFollowing + " button button--primary button--small u-noUserSelect button--withChrome u-accentColor--buttonNormal button--follow js-followButton"} data-action="sign-up-prompt" data-sign-in-action="toggle-subscribe-user" data-requires-token="true" data-redirect="https://medium.com/_/subscribe/user/3299ebce81f1" data-action-source="">
                                                <span className="button-label  button-defaultState js-buttonLabel">Follow</span>
                                                <span className="button-label button-activeState">Following</span>
                                            </button>
                                        </span>
                                    </div>
                                    <div className="u-tableCell">
                                        <a className="link u-baseColor--link avatar is-touched" href="https://medium.freecodecamp.org/@tashian?source=footer_card" title={"Go to the profile of " + articleDetail.author.name} aria-label={"Go to the profile of " + articleDetail.author.name} data-action-source="footer_card" data-user-id={articleDetail.author._id} data-collection-slug="free-code-camp" dir="auto">
                                        <Avatar src={articleDetail.author.provider_pic} className="avatar-image avatar-image--small" alt={"Go to the profile of " + articleDetail.author.name} />
                                        </a>
                                    </div>
                                    <div className="u-tableCell u-verticalAlignMiddle u-breakWord u-paddingLeft15">
                                        <h3 className="ui-h3 u-fontSize18 u-lineHeightTighter u-marginBottom4">
                                            <a className="link link--primary u-accentColor--hoverTextNormal" href="https://medium.freecodecamp.org/@tashian" property="cc:attributionName" title={"Go to the profile of " + articleDetail.author.name} aria-label={"Go to the profile of " + articleDetail.author.name} rel="author cc:attributionUrl" data-user-id={articleDetail.author._id} data-collection-slug="free-code-camp" dir="auto">
                                                {articleDetail.author.name}
                                            </a>
                                        </h3>
                                    </div>
                                </li>
                            </div>
                        </div>
                    </div> */}
                    {/*----------end follow user-----------*/}
                    {/*----------start comment-----------*/}
                    <CommentContent />
                    {/*----------end comment-----------*/}
                    {/*----------start-----------*/}
                    <aside className="u-maxWidth740 u-marginAuto u-maxWidth1000 js-postLeftSidebar">
                        <div className="u-top0 u-sm-hide u-marginLeftNegative12 js-postShareWidget u-fixed u-transition--fadeIn300" data-scroll="fixed" >
                            <ul>
                                <li className="u-textAlignCenter u-marginVertical10">
                                    <div className="multirecommend js-actionMultirecommend u-flexColumn u-marginBottom10 u-width60" data-post-id="82e275c8764f" data-is-icon-29px="true" data-is-vertical="true" data-is-circle="true" data-has-recommend-list="true" data-source="post_share_widget-----82e275c8764f---------------------clap_sidebar">
                                        <span className="u-block u-textAlignCenter u-relative u-background js-actionMultirecommendCount u-flexOrderNegative1 u-height20 u-marginBottom7">
                                            <button className="button button--chromeless u-baseColor--buttonNormal js-multirecommendCountButton u-marginAuto is-touched" data-action="show-recommends" data-action-value="82e275c8764f">
                                            {articleDetail.claps}
                                            </button>
                                        </span>
                                        <div className="u-relative u-foreground">
                                            {/* <button className="is-active  */}
                                            <button onClick={this.clapArticle} className="button button--large button--circle button--withChrome u-baseColor--buttonNormal button--withIcon button--withSvgIcon clapButton js-actionMultirecommendButton clapButton--largePill u-relative u-foreground u-xs-paddingLeft13 u-width60 u-height60 u-accentColor--textNormal u-accentColor--buttonNormal" aria-label="Clap" >
                                                <span className="button-defaultState">
                                                    <span className="svgIcon svgIcon--clap svgIcon--33px u-relative u-topNegative2 u-xs-top0">
                                                        <svg className="svgIcon-use" width="33" height="33" viewBox="0 0 33 33">
                                                        <path d="M28.86 17.342l-3.64-6.402c-.292-.433-.712-.729-1.163-.8a1.124 1.124 0 0 0-.889.213c-.63.488-.742 1.181-.33 2.061l1.222 2.587 1.4 2.46c2.234 4.085 1.511 8.007-2.145 11.663-.26.26-.526.49-.797.707 1.42-.084 2.881-.683 4.292-2.094 3.822-3.823 3.565-7.876 2.05-10.395zm-6.252 11.075c3.352-3.35 3.998-6.775 1.978-10.469l-3.378-5.945c-.292-.432-.712-.728-1.163-.8a1.122 1.122 0 0 0-.89.213c-.63.49-.742 1.182-.33 2.061l1.72 3.638a.502.502 0 0 1-.806.568l-8.91-8.91a1.335 1.335 0 0 0-1.887 1.886l5.292 5.292a.5.5 0 0 1-.707.707l-5.292-5.292-1.492-1.492c-.503-.503-1.382-.505-1.887 0a1.337 1.337 0 0 0 0 1.886l1.493 1.492 5.292 5.292a.499.499 0 0 1-.353.854.5.5 0 0 1-.354-.147L5.642 13.96a1.338 1.338 0 0 0-1.887 0 1.338 1.338 0 0 0 0 1.887l2.23 2.228 3.322 3.324a.499.499 0 0 1-.353.853.502.502 0 0 1-.354-.146l-3.323-3.324a1.333 1.333 0 0 0-1.886 0 1.325 1.325 0 0 0-.39.943c0 .356.138.691.39.943l6.396 6.397c3.528 3.53 8.86 5.313 12.821 1.353zM12.73 9.26l5.68 5.68-.49-1.037c-.518-1.107-.426-2.13.224-2.89l-3.303-3.304a1.337 1.337 0 0 0-1.886 0 1.326 1.326 0 0 0-.39.944c0 .217.067.42.165.607zm14.787 19.184c-1.599 1.6-3.417 2.392-5.353 2.392-.349 0-.7-.03-1.058-.082a7.922 7.922 0 0 1-3.667.887c-3.049 0-6.115-1.626-8.359-3.87l-6.396-6.397A2.315 2.315 0 0 1 2 19.724a2.327 2.327 0 0 1 1.923-2.296l-.875-.875a2.339 2.339 0 0 1 0-3.3 2.33 2.33 0 0 1 1.24-.647l-.139-.139c-.91-.91-.91-2.39 0-3.3.884-.884 2.421-.882 3.301 0l.138.14a2.335 2.335 0 0 1 3.948-1.24l.093.092c.091-.423.291-.828.62-1.157a2.336 2.336 0 0 1 3.3 0l3.384 3.386a2.167 2.167 0 0 1 1.271-.173c.534.086 1.03.354 1.441.765.11-.549.415-1.034.911-1.418a2.12 2.12 0 0 1 1.661-.41c.727.117 1.385.565 1.853 1.262l3.652 6.423c1.704 2.832 2.025 7.377-2.205 11.607zM13.217.484l-1.917.882 2.37 2.837-.454-3.719zm8.487.877l-1.928-.86-.44 3.697 2.368-2.837zM16.5 3.293L15.478-.005h2.044L16.5 3.293z" fillRule="evenodd"></path>
                                                        </svg>
                                                    </span>
                                                </span>
                                                <span className="button-activeState">
                                                    <span className="svgIcon svgIcon--clapFilled svgIcon--33px u-relative u-topNegative2 u-xs-top0">
                                                        <svg className="svgIcon-use" width="33" height="33" viewBox="0 0 33 33">
                                                            <g fillRule="evenodd">
                                                                <path d="M29.58 17.1l-3.854-6.78c-.365-.543-.876-.899-1.431-.989a1.491 1.491 0 0 0-1.16.281c-.42.327-.65.736-.7 1.207v.001l3.623 6.367c2.46 4.498 1.67 8.802-2.333 12.807-.265.265-.536.505-.81.728 1.973-.222 3.474-1.286 4.45-2.263 4.166-4.165 3.875-8.6 2.215-11.36zm-4.831.82l-3.581-6.3c-.296-.439-.725-.742-1.183-.815a1.105 1.105 0 0 0-.89.213c-.647.502-.755 1.188-.33 2.098l1.825 3.858a.601.601 0 0 1-.197.747.596.596 0 0 1-.77-.067L10.178 8.21c-.508-.506-1.393-.506-1.901 0a1.335 1.335 0 0 0-.393.95c0 .36.139.698.393.95v.001l5.61 5.61a.599.599 0 1 1-.848.847l-5.606-5.606c-.001 0-.002 0-.003-.002L5.848 9.375a1.349 1.349 0 0 0-1.902 0 1.348 1.348 0 0 0 0 1.901l1.582 1.582 5.61 5.61a.6.6 0 0 1-.848.848l-5.61-5.61c-.51-.508-1.393-.508-1.9 0a1.332 1.332 0 0 0-.394.95c0 .36.139.697.393.952l2.363 2.362c.002.001.002.002.002.003l3.52 3.52a.6.6 0 0 1-.848.847l-3.522-3.523h-.001a1.336 1.336 0 0 0-.95-.393 1.345 1.345 0 0 0-.949 2.295l6.779 6.78c3.715 3.713 9.327 5.598 13.49 1.434 3.527-3.528 4.21-7.13 2.086-11.015zM11.817 7.727c.06-.328.213-.64.466-.893.64-.64 1.755-.64 2.396 0l3.232 3.232c-.82.783-1.09 1.833-.764 2.992l-5.33-5.33z"></path>
                                                                <path d="M13.285.48l-1.916.881 2.37 2.837z"></path>
                                                                <path d="M21.719 1.361L19.79.501l-.44 3.697z"></path>
                                                                <path d="M16.502 3.298L15.481 0h2.043z"></path>
                                                            </g>
                                                        </svg>
                                                    </span>
                                                </span>
                                            </button>
                                            <div className="clapUndo u-width60 u-round u-height32 u-absolute u-borderBox u-paddingRight5 u-transition--transform200Spring u-background--brandSageLighter js-clapUndo" >
                                                <button className="button button--chromeless u-baseColor--buttonNormal button--withIcon button--withSvgIcon u-floatRight" data-action="multivote-undo" data-action-value="82e275c8764f">
                                                    <span className="svgIcon svgIcon--removeThin svgIcon--29px">
                                                        <svg className="svgIcon-use" width="29" height="29" viewBox="0 0 29 29">
                                                            <path d="M20.13 8.11l-5.61 5.61-5.609-5.61-.801.801 5.61 5.61-5.61 5.61.801.8 5.61-5.609 5.61 5.61.8-.801-5.609-5.61 5.61-5.61" fillRule="evenodd"></path>
                                                        </svg>
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="u-textAlignCenter u-marginVertical10">
                                    <TwitterShareButton title="Twitter" url={ROUTE_ARTICLE_VIEW + formatTitle(articleDetail.title) + '-' + articleDetail._id }>
                                    <button className="button button--large button--dark button--chromeless is-touchIconBlackPulse u-baseColor--buttonDark button--withIcon button--withSvgIcon" title="Share on Twitter" aria-label="Share on Twitter" data-action="share-on-twitter" data-action-source="post_share_widget"><span className="svgIcon svgIcon--twitter svgIcon--29px"><svg className="svgIcon-use" width="29" height="29" viewBox="0 0 29 29"><path d="M21.967 11.8c.018 5.93-4.607 11.18-11.177 11.18-2.172 0-4.25-.62-6.047-1.76l-.268.422-.038.5.186.013.168.012c.3.02.44.032.6.046 2.06-.026 3.95-.686 5.49-1.86l1.12-.85-1.4-.048c-1.57-.055-2.92-1.08-3.36-2.51l-.48.146-.05.5c.22.03.48.05.75.08.48-.02.87-.07 1.25-.15l2.33-.49-2.32-.49c-1.68-.35-2.91-1.83-2.91-3.55 0-.05 0-.01-.01.03l-.49-.1-.25.44c.63.36 1.35.57 2.07.58l1.7.04L7.4 13c-.978-.662-1.59-1.79-1.618-3.047a4.08 4.08 0 0 1 .524-1.8l-.825.07a12.188 12.188 0 0 0 8.81 4.515l.59.033-.06-.59v-.02c-.05-.43-.06-.63-.06-.87a3.617 3.617 0 0 1 6.27-2.45l.2.21.28-.06c1.01-.22 1.94-.59 2.73-1.09l-.75-.56c-.1.36-.04.89.12 1.36.23.68.58 1.13 1.17.85l-.21-.45-.42-.27c-.52.8-1.17 1.48-1.92 2L22 11l.016.28c.013.2.014.35 0 .52v.04zm.998.038c.018-.22.017-.417 0-.66l-.498.034.284.41a8.183 8.183 0 0 0 2.2-2.267l.97-1.48-1.6.755c.17-.08.3-.02.34.03a.914.914 0 0 1-.13-.292c-.1-.297-.13-.64-.1-.766l.36-1.254-1.1.695c-.69.438-1.51.764-2.41.963l.48.15a4.574 4.574 0 0 0-3.38-1.484 4.616 4.616 0 0 0-4.61 4.613c0 .29.02.51.08.984l.01.02.5-.06.03-.5c-3.17-.18-6.1-1.7-8.08-4.15l-.48-.56-.36.64c-.39.69-.62 1.48-.65 2.28.04 1.61.81 3.04 2.06 3.88l.3-.92c-.55-.02-1.11-.17-1.6-.45l-.59-.34-.14.67c-.02.08-.02.16 0 .24-.01 2.12 1.55 4.01 3.69 4.46l.1-.49-.1-.49c-.33.07-.67.12-1.03.14-.18-.02-.43-.05-.64-.07l-.76-.09.23.73c.57 1.84 2.29 3.14 4.28 3.21l-.28-.89a8.252 8.252 0 0 1-4.85 1.66c-.12-.01-.26-.02-.56-.05l-.17-.01-.18-.01L2.53 21l1.694 1.07a12.233 12.233 0 0 0 6.58 1.917c7.156 0 12.2-5.73 12.18-12.18l-.002.04z"></path></svg></span></button>
                                    </TwitterShareButton>
                                </li>
                                <li className="u-textAlignCenter u-marginVertical10">
                                    <FacebookProvider appId={FACEBOOK_APP_ID}>
                                        <Share href={ROUTE_ARTICLE_VIEW + formatTitle(articleDetail.title) + '-' + articleDetail._id }>
                                            <button className="button button--large button--dark button--chromeless is-touchIconBlackPulse u-baseColor--buttonDark button--withIcon button--withSvgIcon" title="Share on Facebook" aria-label="Share on Facebook" data-action="share-on-facebook" data-action-source="post_share_widget"><span className="svgIcon svgIcon--facebook svgIcon--29px"><svg className="svgIcon-use" width="29" height="29" viewBox="0 0 29 29"><path d="M16.39 23.61v-5.808h1.846a.55.55 0 0 0 .546-.48l.36-2.797a.551.551 0 0 0-.547-.62H16.39V12.67c0-.67.12-.813.828-.813h1.474a.55.55 0 0 0 .55-.55V8.803a.55.55 0 0 0-.477-.545c-.436-.06-1.36-.116-2.22-.116-2.5 0-4.13 1.62-4.13 4.248v1.513H10.56a.551.551 0 0 0-.55.55v2.797c0 .304.248.55.55.55h1.855v5.76c-4.172-.96-7.215-4.7-7.215-9.1 0-5.17 4.17-9.36 9.31-9.36 5.14 0 9.31 4.19 9.31 9.36 0 4.48-3.155 8.27-7.43 9.15M14.51 4C8.76 4 4.1 8.684 4.1 14.46c0 5.162 3.75 9.523 8.778 10.32a.55.55 0 0 0 .637-.543v-6.985a.551.551 0 0 0-.55-.55H11.11v-1.697h1.855a.55.55 0 0 0 .55-.55v-2.063c0-2.02 1.136-3.148 3.03-3.148.567 0 1.156.027 1.597.06v1.453h-.924c-1.363 0-1.93.675-1.93 1.912v1.78c0 .3.247.55.55.55h2.132l-.218 1.69H15.84c-.305 0-.55.24-.55.55v7.02c0 .33.293.59.623.54 5.135-.7 9.007-5.11 9.007-10.36C24.92 8.68 20.26 4 14.51 4"></path></svg></span></button>
                                        </Share>
                                    </FacebookProvider>
                                </li>
                                <li className="u-textAlignCenter u-marginVertical10">
                                    <button className="button button--large button--dark button--chromeless is-touchIconFadeInPulse u-baseColor--buttonDark button--withIcon button--withSvgIcon button--bookmark js-bookmarkButton" title="Bookmark this story to read later" aria-label="Bookmark this story to read later" data-action="add-to-bookmarks" data-action-value="" data-action-source="">
                                    <span className="button-defaultState"><span className="svgIcon svgIcon--bookmark svgIcon--29px"><svg className="svgIcon-use" width="29" height="29" viewBox="0 0 29 29"><path d="M19.385 4h-9.77A2.623 2.623 0 0 0 7 6.615V23.01a1.022 1.022 0 0 0 1.595.847l5.905-4.004 5.905 4.004A1.022 1.022 0 0 0 22 23.011V6.62A2.625 2.625 0 0 0 19.385 4zM21 23l-5.91-3.955-.148-.107a.751.751 0 0 0-.884 0l-.147.107L8 23V6.615C8 5.725 8.725 5 9.615 5h9.77C20.275 5 21 5.725 21 6.615V23z" fillRule="evenodd"></path></svg></span></span><span className="button-activeState"><span className="svgIcon svgIcon--bookmarkFilled svgIcon--29px"><svg className="svgIcon-use" width="29" height="29" viewBox="0 0 29 29"><path d="M19.385 4h-9.77A2.623 2.623 0 0 0 7 6.615V23.01a1.022 1.022 0 0 0 1.595.847l5.905-4.004 5.905 4.004A1.022 1.022 0 0 0 22 23.011V6.62A2.625 2.625 0 0 0 19.385 4z" fillRule="evenodd"></path></svg></span></span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </aside>
                    {/*----------end-----------*/}
                </footer>
            </article>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return ({
        getArticleDetail: id => dispatch(getArticleDetail(id)),
        clapArticle: id => dispatch(clapArticle(id)),
        followUser: (id, userId) => dispatch(followUser(id, userId)),
        toggleDialogOpen: data => dispatch(toggleDialogOpen(data))
    });
}

const mapStateToProps = (state) =>({
    articleDetail: state.home.articleDetail,
    common : state.common,
    user : state.authUser.user
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail);