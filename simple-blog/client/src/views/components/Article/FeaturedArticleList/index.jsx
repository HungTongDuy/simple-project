import React from 'react';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

import { 
    ROUTE_ARTICLE_VIEW
} from '../../../../core/constants';

import {
    formatTitle,
    formatDate
} from '../../../../core/utils';

class FeaturedArticleList extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        const numberOfItemDisplay = 4;
        let articles = this.props.articles;
        
        if ((articles != undefined) && (articles != null) && (Object.keys(articles).length > 0)) {
            articles = articles.slice(0, numberOfItemDisplay);
            return (
                <Grid item xs={12} sm={12}>               
                    <Grid xs={7} sm={7} item className="extremeHero-largeCard js-trackedPost">
                        <div className="extremeHero-post">
                            <Link className="link" to={ROUTE_ARTICLE_VIEW + formatTitle(articles[0].title) + '-' + articles[0]._id }><img src={articles[0].feature_img} title={articles[0].title} /></Link>
                            <div className="extremeHero-postContent">
                                <div className="extremeHero-titleClamp">
                                    <h3 className="title"><Link className="link" to={ROUTE_ARTICLE_VIEW + formatTitle(articles[0].title) + '-' + articles[0]._id }>{articles[0].title}</Link></h3>
                                    <div className="content" dangerouslySetInnerHTML={{__html: articles[0].text.substr(0, 80)}}>
                                        {/* {articles[0].text.substr(0, 80) + '...'} */}
                                    </div>
                                </div>
                                <div className="extremeHero-byline">
                                    <p><b>{articles[0].author.name + ' - '}</b> </p>
                                    {/* <p>{moment(new Date(articles[0].createdAt)).fromNow()}</p> */}
                                    <p>{formatDate(articles[0].createdAt)}</p>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={5} sm={5} className="extremeHero-smallCardContainer">
                        {articles.map((article, key) => {
                            if(key != 0) {
                                return (
                                    <div className="card streamItem" key={key}>
                                        <div className="extremePostPreview">
                                            <Grid item xs={4} sm={4} className="extremeHero-image">
                                                <Link className="link" to={ROUTE_ARTICLE_VIEW + formatTitle(article.title) + '-' + article._id }>
                                                    <img src={article.feature_img} title={article.title}/>                                                
                                                </Link>
                                            </Grid>
                                            <Grid item xs={8} xs={8} className="extremeHero-postContent">
                                                <div className="extremeHero-titleClamp">
                                                    <h3 className="title">
                                                        <Link className="link" to={ROUTE_ARTICLE_VIEW + formatTitle(article.title) + '-' + article._id }>
                                                            {article.title}                                            
                                                        </Link>
                                                    </h3>
                                                </div>
                                                <div className="extremeHero-content">
                                                    {/* <p dangerouslySetInnerHTML={{__html: article.text.substr(0, 50)}}></p> */}
                                                    <p className="mt-5 text-muted">{article.author.name + ' - '}</p>
                                                    {/* <p>{moment(new Date(article.createdAt)).fromNow()}</p> */}
                                                    <p>{formatDate(articles[0].createdAt)}</p>
                                                </div>
                                            </Grid>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </Grid>

                </Grid>
            );
        } else {
            return(
                <div>
                </div>
            );
        }
        
    }
}

export default FeaturedArticleList;