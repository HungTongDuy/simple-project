import { 
    SUCCESS,
    PROGRESS_PUBLISH
} from '../constants';

const initialState = {
    title: '',
    text: '',
    description: '',
    imgSrc: null,
    author: {}
}

export default ( state = initialState, action ) => {
    // console.log('reducers-common: ', action);
    switch(action.type) {
        case PROGRESS_PUBLISH:
            return {
                ...state,
            }
        
        default:
            return state;
    }
}