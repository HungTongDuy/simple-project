import React from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import './AddArticle.css';
import $ from 'jquery';

import { 
    SUBMIT_ARTICLE, 
    EDIT_ARTICLE,
    SUCCESS,
    ERROR
} from '../../../../core/constants';

import { onLoadProgress, onSubmitPublish, toggleDialogOpen } from '../../../../core/actions';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';

import FroalaEditor from 'react-froala-wysiwyg';
import FroalaEditorImg from 'react-froala-wysiwyg/FroalaEditorImg';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';


import { EditorState, convertToRaw, ContentState, convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


import ReactQuill, { Quill } from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6


import SnackbarNotification from '../../../components/SnackbarNotification';

const config = {
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: false
}


class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            text: '',
            description: '',
            imgSrc: null,
            loading: false,
            editorState: '',
            contentState: {},
            textQuill: ''
        }

        // this.handleSubmit = this.handleSubmit.bind(this);
        this.updateContent = this.updateContent.bind(this);
        this.handleModelChange = this.handleModelChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.previewImg = this.previewImg.bind(this);
        this.publishStory = this.publishStory.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);

        this.onEditorStateChange = this.onEditorStateChange.bind(this);
        this.onContentStateChange = this.onContentStateChange.bind(this);

        this.handleChangeQuill = this.handleChangeQuill.bind(this);
    }

    // handleSubmit() {
    //     const { title, body, author } = this.state;
    //     const { onSubmit, articleToEdit, onEdit } = this.props;

    //     if(!articleToEdit) {
    //         return axios.post(API_ARTICLE_URL, { title, body, author })
    //         .then((res) => {
    //             console.log('response', res);
    //             if (res.status == 200) {
    //                 this.setState({
    //                     isSubmitSuccess: true
    //                 });
    //                 $('#exampleModalCenter').modal('show');
    //             }
    //             onSubmit(res.data);
    //         })
    //         .then(() => this.setState({ title: '', body: '', author: '' }));
    //     } else {
    //         return axios.patch(API_ARTICLE_URL + articleToEdit._id, { title, body, author })
    //         .then((res) => onEdit(res.data))
    //         .then(() => this.setState({ title: '', body: '', author: '' }));
    //     }
    // }

    // onClickClose() {
    //     this.setState({
    //         isSubmitSuccess: false
    //     });
    // }

    componentWillMount() {
        var pathname = this.props.location.pathname;
        // console.log(pathname);
        var start = pathname.lastIndexOf('editor/');
        // console.log('start', start);
        var end = pathname.lastIndexOf('/edit');
        // console.log('end', end);
        var id = pathname.slice(start, end);
        // console.log('id: ', id);
    }

    handleModelChange(model) {
        // console.log('handleModelChange', model);
        this.setState({
            text: model,
            description: `${model.substring(0,30).toString()}...`
        });
    }

    onEditorStateChange(text) {
        // console.log('onEditorStateChange', text);
        this.setState({
            editorState : text
        })
    }

    onContentStateChange(contentState) {
        this.setState({
            contentState : contentState
        })
    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.articleToEdit) {
            this.setState({
                title: nextProps.articleToEdit.title,
                body: nextProps.articleToEdit.body,
                author: nextProps.articleToEdit.author
            });
        }
    }

    updateContent(newContent) {
        this.setState({
            content: newContent
        })
    }
    
    onChange(evt){
        console.log("onChange fired with event info: ", evt);
        var newContent = evt.editor.getData();
        this.setState({
            content: newContent
        })
    }
    
    onBlur(evt){
        console.log("onBlur event called with event info: ", evt);
    }
    
    afterPaste(evt){
        console.log("afterPaste event called with event info: ", evt);
    }

    previewImg () {
        const file = this.refs.fileUploader.files[0]
        var reader = new FileReader()
        reader.onload = function (e) {
            document.getElementById('image_preview').src = e.target.result
            this.setState({
                imgSrc: file/*e.target.result*/
            })
        }.bind(this)
        reader.readAsDataURL(file)
    }

    handleClick () {
        this.refs.fileUploader.click()
    }

    publishStory () {
        if(localStorage.Auth) {
            this.props.onLoadProgress(true);
            // let formdata = {
            //     text: this.state.text,
            //     image: this.state.imgSrc,
            //     title: this.state.title,
            //     author_id: JSON.parse(localStorage.Auth)._id,
            //     description: this.state.description,
            //     claps: 0
            // }
            const formdata = new FormData()
            formdata.append('text', this.state.textQuill)
            formdata.append('image', this.state.imgSrc)
            formdata.append('title', this.state.title)
            formdata.append('author_id', JSON.parse(localStorage.Auth)._id)
            formdata.append('description', this.state.description)
            formdata.append('claps', 0)
            console.log('formdata', formdata);
            this.props.onSubmitPublish(formdata);
        } else {
            console.log('publishStory-false');
            this.props.toggleDialogOpen({ signIn: false, signUp: true });
        }
    }

    handleChangeTitle(e) {
        console.log('handleChangeTitle', document.getElementById('title-article').value);
        const el = findDOMNode(this.refs.refTitle);
        console.log('jquery---', $(el).value);
        this.setState({
            title: e.target.value
        });
    }

    handleChangeQuill(val) {
        this.setState({
            textQuill: val
        })
    }

    render() {
        console.log('state-addArticle: ', this.state);
        const common = this.props;

        return (
            <CardContent className="add-article-component">
                <Grid container spacing={24} item xs={8} sm={8} className="editor-article-container">
                    <Grid item xs={12} sm={12}>
                        <Grid item xs={2} sm={2}>
                            <span className="picture_upload" onClick={this.handleClick}>
                                <i className="fa fa-camera"></i>
                            </span>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <div className={this.state.imgSrc != null ? 'file-upload-previewer' : 'file-upload-previewer hidden'}>
                                <img src="" alt="" id="image_preview"/>
                            </div>
                            <div className="existing-img-previewer" id="existing-img-previewer">
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Title"
                                placeholder="Title"
                                className="textField"
                                id="title-article"
                                margin="normal"
                                onChange={this.handleChangeTitle}
                            />
                            {/* <FroalaEditorView
                                model={this.state.text}
                            /> */}
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            {/* <FroalaEditor 
                                id="editor"
                                tag='textarea'
                                config={config}
                                //model={this.state.model}
                                onModelChange={this.handleModelChange}
                            /> */}

                            {/* <Editor
                                editorState={this.state.editorState}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                //onEditorStateChange={this.onEditorStateChange}
                                onContentStateChange={this.onContentStateChange}
                                //toolbar={toolbar}
                            /> */}
                            <ReactQuill 
                                value={this.state.textQuill}
                                onChange={this.handleChangeQuill}
                                modules={Form.modules}
                                formats={Form.formats}
                            />

                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <div className="hidden">
                                <input type="file" onChange={ ()=>this.previewImg()} id="file" ref="fileUploader"/>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Button 
                            onClick={this.publishStory} 
                            variant="contained" 
                            className="btn btn-primary float-right publish-button" 
                            color="primary" >
                            Publish
                        </Button>
                        { !common.loadingPublish ? '' :
                            <LinearProgress className="progress-public green-border-button" />
                        }
                    </Grid>
                </Grid>
                <SnackbarNotification />
            </CardContent>
        )
    }
}
var toolbarOptions = {
    container: [
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': ['serif','monospace'] }],
        ['bold', 'italic', 'underline', 'strike'],     // toggled buttons
        ['blockquote', 'code-block'],
        [{ 'align': ['','center','right','justify'] }],
        //[{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        //[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        ['link','image','video'],
        ['clean']                                         // remove formatting button
    ]
}

Form.modules = {
    toolbar: toolbarOptions,
    clipboard: {
        matchVisual: false,
    }
};

const mapDispatchToProps = (dispatch) => ({
    onSubmit: data => dispatch({ type: SUBMIT_ARTICLE, data }),
    onEdit: data => dispatch({ type: EDIT_ARTICLE, data }),
    onLoadProgress: data => dispatch(onLoadProgress(data)),
    onSubmitPublish: data => dispatch(onSubmitPublish(data)),
    toggleDialogOpen: data => dispatch(toggleDialogOpen(data))
});

const mapStateToProps = state => ({
    articleToEdit: state.home.articleToEdit,
    common: state.common
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);