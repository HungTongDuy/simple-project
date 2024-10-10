import { 
    HOME_PAGE_LOADED, 
    DELETE_ARTICLE, 
    SET_EDIT, 
    SUBMIT_ARTICLE, 
    EDIT_ARTICLE, 
    SET_USER, 
    SET_ARTICLE_DETAIL 
} from '../constants';

const initialState = {
    articles: '',
    articleToEdit: '',
    articleDetail: ''
}

export default ( state = {}, action ) => {
    switch(action.type) {
        case HOME_PAGE_LOADED:
            return {
                ...state,
                articles: action.data
            };
        
        case SET_ARTICLE_DETAIL:
            return {
                ...state,
                articleDetail: action.data
            }

        case SUBMIT_ARTICLE:
            return {
                ...state,
                articles: ([action.data.article]).concat(state.articles)
            };
        
        case DELETE_ARTICLE:
            return {
                ...state,
                articles: state.articles.filter((article) => article._id !== action.id)
            };

        case SET_EDIT:
            return {
                ...state,
                articleToEdit: action.article
            };

        case EDIT_ARTICLE:
            return {
                ...state,
                articles: state.articles.map((article) => {
                    if(article._id === action.data.article._id) {
                        return {
                            ...action.data.article
                        }
                    }
                    return article;
                }),
                articleToEdit: undefined
            }

        default:
            return state;
    }
}