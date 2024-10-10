import React from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';

import './Footer.css';

class Footer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <footer className="footer">
                <div className="pt-2">
                    {/* <div className="row">
                        <div className="mb-1 mb-md-0 col-md-4">
                            <h4 className="footer__header">Resources</h4>
                            <ul className="list-unstyled footer__links resources">
                            <li><a href="/" className="link active">Posts</a></li>
                            <li><a href="/questions" className="link">Questions</a></li>
                            <li><a href="/videos" className="link">Videos</a></li>
                            <li><a href="/tags" className="link">Tags</a></li>
                            <li><a href="/authors" className="link">Authors</a></li>
                            <li><a href="/tools" target="_blank" className="link">Tools</a></li>
                            </ul>
                        </div>
                        <div className="mb-1 mb-md-0 col-md-3 offset-xl-1">
                            <h4 className="footer__header">Links</h4>
                            <ul className="list-unstyled footer__links">
                            <li className="footer__links__external-link">
                                <a href="https://www.facebook.com/viblo.asia/" target="_blank" className="link">
                                    <i className="fa fa-facebook link-icon"></i>Facebook
                                </a>
                            </li>
                            <li className="footer__links__external-link">
                                <a href="https://github.com/viblo-asia/" target="_blank" className="link">
                                    <i className="fa fa-github link-icon"></i>GitHub
                                </a>
                            </li>
                            <li className="footer__links__external-link">
                                <a href="https://chrome.google.com/webstore/detail/viblos-news-feed/mliahmjgdpkkicelofhbhgiidgljijmj" target="_blank" className="link">
                                    <i className="fa fa-chrome link-icon"></i>Browser extension
                                </a>
                            </li>
                            <li className="footer__links__external-link">
                                <a href="https://atom.io/packages/viblo" target="_blank" className="link">
                                    <img src="https://cdn.viblo.asia/img/atom-editor.758b87a.svg" className="link-icon" />Atom plugin
                                </a>
                            </li>
                            </ul>
                        </div>
                        <div className="mb-1 mb-md-0 col-md-3 offset-md-1">
                            
                        </div>
                    </div> */}
                    <hr className="footer__divider"/>
                    <div className="row py-1">
                        {/* <Grid item xs={9} sm={9}>
                            <p className="copyright">
                            © 2018 <b>Code</b>. All rights reserved.
                            </p>
                        </Grid> */}
                    
                        <Grid item xs={12} sm={12}>
                            <ul className="list-unstyled justify-content-md-between">
                            <li className="mb-05"><a href="/" className="link">Facebook</a></li>
                            <li className="mb-05"><a href="/" className="link">Github</a></li>
                            <li className="mb-05"><a href="/" className="link">Twitter</a></li>
                            <li className="mb-05"><a href="/" className="link">Sách mình đang đọc</a></li>
                            </ul>
                        </Grid>
                    </div>
                </div>
            </footer>
        )
    }
}

export default connect()(Footer);