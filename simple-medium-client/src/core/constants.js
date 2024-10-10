//=========================================================
//  CONSTANTS
//---------------------------------------------------------
export const APP_NAME = 'Light Blog';

//=========================================================
//  ACTIONS
//---------------------------------------------------------
export const HOME_PAGE_LOADED = 'HOME_PAGE_LOADED';

export const DELETE_ARTICLE= 'DELETE_ARTICLE';

export const SET_EDIT = 'SET_EDIT'

export const SUBMIT_ARTICLE = 'SUBMIT_ARTICLE';

export const EDIT_ARTICLE = 'EDIT_ARTICLE';

export const SET_USER = 'SET_USER';

export const TOGGLE_OPEN_DIALOG_SIGNIN = 'TOGGLE_OPEN_DIALOG_SIGNIN';

export const TOGGLE_CLOSE_DIALOG_SIGNIN = 'TOGGLE_CLOSE_DIALOG_SIGNIN';

export const CLEAR_USER = 'CLEAR_USER';

export const PROGRESS_PUBLISH = 'PROGRESS_PUBLISH';

export const TOGGLE_DIALOG_PUBLISH = 'TOGGLE_DIALOG_PUBLISH';

export const OPEN_SNACKBAR_NOTIFICATION = 'OPEN_SNACKBAR_NOTIFICATION';

export const CLOSE_SNACKBAR_NOTIFICATION = 'CLOSE_SNACKBAR_NOTIFICATION';

export const SET_ARTICLE_DETAIL = 'SET_ARTICLE_DETAIL';

export const SET_PROFILE = 'SET_PROFILE';

//=========================================================
//  SERVER
//---------------------------------------------------------
export const HOST = 'localhost';

export const PORT = 8000;

//=========================================================
//  API
//---------------------------------------------------------
// export const API_BASE_URL = `http://${HOST}:${PORT}`;

export const API_BASE_URL = 'https://simple-medium-api.herokuapp.com';

export const API_ARTICLE_URL = `${API_BASE_URL}/api/articles/`;

export const API_ARTICLE_CLAP_URL = `${API_BASE_URL}/api/articles/clap/`;

export const API_ARTICLE_EDITOR_URL = `${API_BASE_URL}/api/article/editor/`;

export const API_ARTICLE_COMMENT_URL = `${API_BASE_URL}/api/articles/comment/`;

export const API_ARTICLE_CLAP_COMMENT_URL = `${API_BASE_URL}/api/articles/clap_comment/`;

export const API_USER_SIGNIN_URL = `${API_BASE_URL}/api/user/signin/`;

export const API_USER_URL = `${API_BASE_URL}/api/user/`;

export const API_USER_FOLLOW_URL = `${API_BASE_URL}/api/user/follow/`;

export const API_LOGIN_URL = `${API_BASE_URL}/api/signin/`;

export const API_FOLLOW_USER_URL = `${API_BASE_URL}/api/user/follow/`;

export const API_USER_PROFILE_URL = `${API_BASE_URL}/api/user/profile/`;

//=========================================================
//  COMMON
//---------------------------------------------------------
export const SUCCESS = 'success';

export const ERROR = 'error';

export const INFO = 'info';

export const WARNING = 'warning';

export const TIMEOUT_CLOSE_SNACKBAR_NOTIFICATION = 5000;

export const VERTICAL_SNACKBAR = 'top';

export const HORIZONTAL_SNACKBAR = 'right';

export const FACEBOOK_APP_ID = '308747443230320';

//=========================================================
//  COMMON
//---------------------------------------------------------
export const MESSAGE_ADD_ARTICLE_SUCCESS = 'Add article success.';

export const MESSAGE_ADD_ARTICLE_FAILED = 'Add article failed.';

export const MESSAGE_POST_COMMENT_SUCCESS = 'Post comment success.';

export const MESSAGE_POST_COMMENT_FAILED = 'Post comment failed.';

//=========================================================
//  ROUTER
//---------------------------------------------------------

export const PORT_CLIENT = 8002;

export const API_CLIENT_URL = `http://${HOST}:${PORT_CLIENT}`;

export const ROUTE_ARTICLE_VIEW = '/article-view/';

export const ROUTE_ARTICLE_EDITOR = '/article/editor/';

export const ROUTE_CATEGORIES = '/categories/';
