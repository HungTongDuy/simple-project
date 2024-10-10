import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { NewArticleList, FeaturedArticleList } from '../../components/Article';
import { HOME_PAGE_LOADED, DELETE_ARTICLE, SET_EDIT, API_ARTICLE_URL } from '../../../core/constants';
import Grid from '@material-ui/core/Grid';

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    componentWillMount() {
        const { onLoad } = this.props;
        
        axios.get(API_ARTICLE_URL)
        .then((res) => {
            onLoad(res.data)
        });
    }

    handleDelete(id) {
        const { onDelete } = this.props;

        return axios.delete(API_ARTICLE_URL + id)
        .then(() => onDelete(id));
    }

    handleEdit(id) {
        const { setEdit } = this.props;

        setEdit(id);
    }

    render() {
        let { articles } = this.props;
        return (
            <div>
                {/* <div className="homeTopStream">
                    <FeaturedArticleList articles={articles} />
                </div> */}
                <div className="homeCenterStream">
                    <Grid item xs={12} sm={12}>
                        <NewArticleList articles={articles} />
                    </Grid>
                    {/* <Grid item xs={4}>
                        
                    </Grid> */}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    articles: state.home.articles
});

const mapDispatchToProps = (dispatch) => ({
    onLoad: (data) => dispatch({ type: HOME_PAGE_LOADED, data }),
    onDelete: (id) => dispatch({ type: DELETE_ARTICLE, id }),
    setEdit: (id) => dispatch({ type: SET_EDIT, id})
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);