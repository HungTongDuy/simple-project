"use strict";

import {
    API_USER_SIGNIN_URL, 
    CLEAR_USER, 
    SET_USER, 
    API_USER_URL, 
    TOGGLE_OPEN_DIALOG_SIGNIN,
    TOGGLE_CLOSE_DIALOG_SIGNIN,
    PROGRESS_PUBLISH,
    API_ARTICLE_URL,
    API_LOGIN_URL,
    TOGGLE_DIALOG_PUBLISH,
    OPEN_SNACKBAR_NOTIFICATION,
    CLOSE_SNACKBAR_NOTIFICATION,
    SUCCESS,
    ERROR,
    TIMEOUT_CLOSE_SNACKBAR_NOTIFICATION,
    MESSAGE_ADD_ARTICLE_SUCCESS,
    MESSAGE_ADD_ARTICLE_FAILED,
    SET_ARTICLE_DETAIL,
    API_ARTICLE_CLAP_URL,
    API_FOLLOW_USER_URL,
    API_ARTICLE_COMMENT_URL,
    API_ARTICLE_CLAP_COMMENT_URL,
    MESSAGE_POST_COMMENT_SUCCESS,
    MESSAGE_POST_COMMENT_FAILED,
    API_USER_PROFILE_URL,
    SET_PROFILE
} from '../constants';
import axios from 'axios';

export const getUser = (_id) => {
    return axios.get(API_USER_URL + _id).then((res)=>{
        return res.data
    }).catch(err=>console.log('Error: ', err))
}

export const signInWithGoogle = (data) => {
    return (dispatch) => {
        console.log('SignUpUserWithGoogle', data);
        let postData = {
            name: data.w3.ig,
            provider: 'google',
            email: data.w3.U3,
            provider_id: data.El,
            token: data.Zi.access_token,
            provider_pic: data.w3.Paa
        }
        console.log('SignInWithGoogle-postData: ', postData);
        axios.post(API_USER_URL, postData).then((res) => {
            let user = res.data;
            localStorage.setItem('Auth', JSON.stringify(user));
            dispatch({type: SET_USER, user});
            dispatch(toggleDialogClose());
        }).catch((err) => {
            console.log('Error: ', err);
        })
    }
};

export const signInWithFacebook = (data) => {
    console.log('signInWithFacebook: ', data);
    let userId = data.tokenDetail.userID;
    let accessToken = data.tokenDetail.accessToken;
    var url_api = `http://graph.facebook.com/${userId}/?fields=picture&type=large&access_token=${accessToken}`;

    return (dispatch) => {
        axios.get(url_api)
        .then((res) => {
            console.log('respone-picture: ', res.data);
            data.picture = res.data.picture.data;

            let postData = {
                email : data.profile.email,
                name : data.profile.name,
                provider : 'facebook',
                provider_id : data.profile.id,
                provider_pic : data.picture.url,
                token : data.tokenDetail.accessToken,
            };
            console.log('SignInWithFacebook-postData: ', postData);
            axios.post(API_USER_URL, postData).then((res) => {
                let user = res.data;
                localStorage.setItem('Auth', JSON.stringify(user));
                dispatch({type: SET_USER, user});
                dispatch(toggleDialogClose());
            }).catch((err)=>{console.log(err);})

        }).catch((err) => {
            console.log('Error: ', err);
        })
    }
}

export const signInWithAccount = (data) => {
    return (dispatch) => {
        console.log('signInWithAccount', data);        
        axios.post(API_LOGIN_URL, data).then((res) => {
            let user = res.data;
            localStorage.setItem('Auth', JSON.stringify(user));
            dispatch({type: SET_USER, user});
            dispatch(toggleDialogClose());
        }).catch((err) => {
            console.log('Error: ', err);
        })
    }
}

export const signUpWithAccount = (data) => {
    return (dispatch) => {
        console.log('signUpWithAccount', data);
        axios.post(API_USER_URL, data).then((res) => {
            let user = res.data;
            localStorage.setItem('Auth', JSON.stringify(user));
            dispatch({type: SET_USER, user});
            dispatch(toggleDialogClose());
        }).catch((err) => {
            console.log('Error: ', err);
        })
    }
}

export const toggleDialogOpen = (data) => {
    console.log('toggleDialog', data);
    return (dispatch) => {
        dispatch({ type: TOGGLE_OPEN_DIALOG_SIGNIN, data })
    }
}

export const toggleDialogClose = data => {
    console.log('toggleDialog', data);
    return (dispatch) => {
        dispatch({ type: TOGGLE_CLOSE_DIALOG_SIGNIN })
    }
}

export const signOut = data => {
    return (dispatch) => {
        dispatch({ type: CLEAR_USER,  user: JSON.parse(localStorage.Auth) });
        localStorage.removeItem('Auth');
    }
}

export const onLoadProgress = data => {
    console.log('onLoadProgress---', data);
    return (dispatch) => {
        dispatch({ type: PROGRESS_PUBLISH, data })
    }
}

export const onSubmitPublish = formdata => {
    return (dispatch) => {
        dispatch(onLoadProgress(true));
        console.log('formdata', formdata);
        axios.post(API_ARTICLE_URL, formdata).then((res) => {
            console.log('res--', res);
            if(res.status == 200) {
                dispatch(onLoadProgress(false));
                dispatch(openSnackbarNotification(SUCCESS, MESSAGE_ADD_ARTICLE_SUCCESS));
            }
        }).catch((err)=>{
            console.log(err);
            dispatch(onLoadProgress(false));
            dispatch(openSnackbarNotification(ERROR, MESSAGE_ADD_ARTICLE_FAILED));
        })

        //dispatch({ type: SUBMIT_ARTICLE, article })
    }
}

export const openSnackbarNotification = (variant, message) => {
    let data = { 
        variant: variant, 
        message: message
    };
    console.log('openSnackbarNotification');
    return (dispatch) => {
        dispatch({ type : OPEN_SNACKBAR_NOTIFICATION, data });
        setTimeout(() => {
            dispatch(closeSnackbarNotification());
        }, TIMEOUT_CLOSE_SNACKBAR_NOTIFICATION);
    }
}

export const closeSnackbarNotification = () => {
    let data = { 
        variant: SUCCESS, 
        message: ''
    };
    return (dispatch) => {
        dispatch({ type : CLOSE_SNACKBAR_NOTIFICATION, data })
    }
}

async function getArticle(articleId) {
    try {
        const response = await axios.get(API_ARTICLE_URL + articleId);
        console.log(response);
        return response;
    } catch (err) {
        console.log('Error: ', err);
    }
}

export const getArticleDetail = (articleId) => {
    return (dispatch) => {
        axios.get(API_ARTICLE_URL + articleId)
        .then(function (response) {
            // handle success
            console.log(response);
            dispatch({ type: SET_ARTICLE_DETAIL, data: response.data });
        })
        .catch(function (err) {
            // handle error
            console.log('Error: ', err);
        })
    }
}

export const clapArticle = (articleId) => {
    let data = {
        article_id: articleId
    }
    return(dispatch) => {
        axios.post(API_ARTICLE_CLAP_URL, data).then((res) => {
            console.log('res--', res);
            if(res.status == 200) {
                dispatch(getArticleDetail(articleId));
            }
        }).catch((err) => {
            console.log('Error: ', err);
        })
    }
}

export const followUser = (id, userId) => {
    let data = {
        id: id,
        user_id: userId
    }
    console.log('followUser-actions', data);
    return(dispatch) => {
        axios.post(API_FOLLOW_USER_URL, data).then((res) => {
            if(res.status == 200) {
                axios.get(API_USER_URL + id).then((res)=>{
                    dispatch({ type: SET_USER, user: res.data })
                }).catch(err=>console.log('Error: ', err))
            }
        }).catch((err) => {
            console.log('Error: ', err);
        })
    }
}

export const postComment = (articleId, authorId, comment) => {
    let data = {
        article_id: articleId,
        author_id: authorId,
        comment: comment
    }
    return(dispatch) => {
        axios.post(API_ARTICLE_COMMENT_URL, data).then((res) => {
            dispatch(openSnackbarNotification(SUCCESS, MESSAGE_POST_COMMENT_SUCCESS));
            dispatch(getArticleDetail(articleId));
        }).catch((err) => {
            console.log('Error: ', err);
            dispatch(openSnackbarNotification(ERROR, MESSAGE_POST_COMMENT_FAILED));
        })
    }
}

export const getUserProfile = (_id) => {
    console.log('getUserProfile');
    return (dispatch) => {
        axios.get(API_USER_PROFILE_URL + _id).then((res)=>{
            let profile = res.data
            dispatch({type: SET_PROFILE, profile})
        }).catch(err=>console.log(err))
    }
}

export const change_name_user = (text) => {
    return (dispatch) => {
        dispatch({ type: 'CHANGE_NAME_USER', data: text})
    }
}

export const edit_user = (data) => {
    return (dispatch) => {
        var _id = JSON.parse(localStorage.Auth)._id;
        axios.put(API_USER_URL + _id, data).then((res) => {
            dispatch(openSnackbarNotification(SUCCESS, 'Edit user success.'));
            axios.get(API_USER_URL + _id).then((res)=> {
                dispatch({ type: SET_USER, user: res.data })
            }).catch(err=>console.log('Error: ', err))
            dispatch(getUserProfile(_id));
        }).catch((err) => {
            dispatch(openSnackbarNotification(ERROR, 'Edit user error.'));
            console.log(err);
        })
    }
}

export const clap_comment = (article_id, comment_id) => {
    const data = {
        article_id: article_id,
        comment_id: comment_id
    }
    return(dispatch) => {
        axios.post(API_ARTICLE_CLAP_COMMENT_URL, data).then((res) => {
            if(res.status == 200) {
                dispatch(getArticleDetail(article_id));
            }
        }).catch((err) => {
            console.log(err);
        })
    }
}