import React, { NewLifecycle } from 'react';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

import { 
    ROUTE_ARTICLE_VIEW
} from '../../../../core/constants';

import {
    formatTitle,
    formatDate
} from '../../../../core/utils';

class NewArticleList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const articles = this.props.articles;
        return (
            <div>
            { articles == undefined ? '' : 
                articles.map((article, key) => {
                    return (
                        <Card className="card streamItem" key={key}>
                            <CardContent className="extremePostPreview">
                                <Grid item className="extremePostPreview-post" xs={12}>
                                    <div className="card-header">
                                        <h3 className="title"><Link className="link" to={ROUTE_ARTICLE_VIEW + formatTitle(article.title) + '-' + article._id }>{article.title}</Link></h3>
                                    </div>
                                    <div className="card-body">
                                        {/* <p dangerouslySetInnerHTML={{__html: article.text.substr(0, 220)}}></p> */}
                                        {/* {article.text.substr(0, 80) + '...'} */}
                                        <p className="mt-5 text-muted"> {formatDate(article.createdAt)}</p>
                                    </div>
                                    <div className="card-footer">
                                        <div className="row">
                                            {/* <button onClick={() => this.handleEdit(article)} className="btn btn-primary mx-3">
                                                Edit
                                            </button>
                                            <button onClick={() => this.handleDelete(article._id)} className="btn btn-danger">
                                                Delete
                                            </button> */}
                                            {/* <Button onClick={() => this.handleEdit(article)} variant="contained" color="primary">
                                                Edit
                                            </Button>
                                            <Button onClick={() => this.handleDelete(article._id)} variant="contained" color="secondary">
                                                Delete
                                            </Button> */}
                                        </div>
                                    </div>
                                </Grid>
                                {/* <Grid item className="extremePostPreview-image" xs={4}>
                                    <Link className="link" to={ROUTE_ARTICLE_VIEW + formatTitle(article.title) + '-' + article._id }>
                                        <img src={article.feature_img.url} title={article.title} />
                                    </Link>
                                </Grid> */}
                            </CardContent>
                        </Card>
                    );
                })
            }
            </div>
        );
    }
}

export default NewArticleList;