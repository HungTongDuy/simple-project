import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import ArticleDetail from './components/ArticleDetail';
import Header from './components/Header';
import Home from './screens/Home';
import AddArticle from './screens/Article/AddArticle';
import Footer from './components/Footer';
import Profile from './components/Profile';

import './app.css';

const App = () => {
    return (
        <div className="app">
            <Header />
            <div className="row pt-5 container homeContainer main">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/article-view/" component={ArticleDetail} />
                    <Route path="/categories/" />
                    <Route path="/article/editor/" component={AddArticle} />
                    <Route path="/profile/:user/:id/:key(|edit|following|followers)" component={Profile} />
                </Switch>
            </div>
            <Footer />
        </div>
    )
}

export default withRouter(App);