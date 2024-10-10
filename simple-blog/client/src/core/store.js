import { createStore, combineReducers, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

import { home, authUser, common } from './reducers';

const reducers = combineReducers({
    home,
    authUser,
    common
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;