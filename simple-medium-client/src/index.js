import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { Route, Switch, Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './core/store';
import App from './views/app';

import { SET_USER } from './core/constants';

import { getUser } from './core/actions';

if(localStorage.Auth) {
    store.dispatch({type: SET_USER, user: JSON.parse(localStorage.Auth)});
    var _id = JSON.parse(localStorage.Auth)._id;
    getUser(_id).then((res) => {
        store.dispatch({ type: SET_USER, user: res });
    });
}

ReactDOM.render (
    <Router history={createHistory()}>
        <Provider store={store}>
            <Switch>
                <Route path="/" component={App} />
            </Switch>
        </Provider>
    </Router>,
    document.getElementById('root'),
);