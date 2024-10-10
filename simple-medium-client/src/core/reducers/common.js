import { 
    TOGGLE_CLOSE_DIALOG_SIGNIN, 
    TOGGLE_OPEN_DIALOG_SIGNIN, 
    PROGRESS_PUBLISH, 
    TOGGLE_DIALOG_PUBLISH,
    OPEN_SNACKBAR_NOTIFICATION,
    CLOSE_SNACKBAR_NOTIFICATION,
    SUCCESS,
    VERTICAL_SNACKBAR,
    HORIZONTAL_SNACKBAR
} from '../constants';

const initialState = {
    openDialogSignin: false,
    loadingPublish: false,
    signUp: false,
    SignIn: false,
    isEditArticle: false,
    openDialogPublish: false,
    toggleSnackbarNotification: false,
    variantNotification: SUCCESS,
    messageNotification: '',
    vertical: VERTICAL_SNACKBAR,
    horizontal: HORIZONTAL_SNACKBAR
}

export default ( state = initialState, action ) => {
    console.log('reducers-common: ', action);
    switch(action.type) {
        case TOGGLE_CLOSE_DIALOG_SIGNIN:
            return {
                ...state,
                openDialogSignin: !state.openDialogSignin
            }
        
        case TOGGLE_OPEN_DIALOG_SIGNIN:
            return {
                ...state,
                signIn: action.data.signIn,
                signUp: action.data.signUp,
                openDialogSignin: !state.openDialogSignin
            }
        case TOGGLE_DIALOG_PUBLISH:
            return {
                ...state,
                openDialogPublish: !state.openDialogPublish
            }
        
        case OPEN_SNACKBAR_NOTIFICATION:
            return {
                ...state,
                toggleSnackbarNotification: true,
                variantNotification: action.data.variant,
                messageNotification: action.data.message
            }

        case CLOSE_SNACKBAR_NOTIFICATION:
            return {
                ...state,
                toggleSnackbarNotification: false
            }

        case PROGRESS_PUBLISH:
            return {
                ...state,
                loadingPublish: action.data
            }
        
        default:
            return state;
    }
}
