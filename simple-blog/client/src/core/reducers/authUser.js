import { SET_USER, CLEAR_USER, SET_PROFILE } from '../constants';

const initialState = {
    isAuth: false,
    user: {},
    profile: {},
    edit_name : ''
}

export default ( state = initialState, action ) => {
    // console.log('reducers-authUser: ', action);
    switch(action.type) {
        case SET_USER:
            return {
                ...state,
                isAuth: Object.keys(action.user).length > 0 ? true : false,
                user: action.user
            }

        case CLEAR_USER:
            return {
                ...state,
                isAuth: false,
                user: {}
            }

        case SET_PROFILE:
            return {
                ...state,
                profile: action.profile,
                edit_name: action.profile.user.name
            }

        case 'CHANGE_NAME_USER':
            return {
                ...state,
                edit_name: action.data
            }

        case 'SET_EDIT_USER':
            return {
                ...state,
                user: action.user
            }
        
        default:
            return state;
    }
}
