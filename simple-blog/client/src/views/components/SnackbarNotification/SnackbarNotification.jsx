import React from 'react';
import { connect } from 'react-redux';

import Snackbar from '@material-ui/core/Snackbar';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';

import './SnackbarNotification.css';

import { closeSnackbarNotification } from '../../../core/actions';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

class SnackbarNotification extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            vertical: 'top',
            horizontal: 'right',
        }

        this.handleClose = this.handleClose.bind(this);        
    }

    handleClose(){
        this.props.closeSnackbarNotification();
    }

    render() {
        const { vertical, horizontal, toggleSnackbarNotification, variantNotification, messageNotification } = this.props.common;
        const Icon = variantIcon[variantNotification];
        return (
            <div>
                <Snackbar
                    className={'snackbar-message ' + variantNotification}
                    anchorOrigin={{ vertical, horizontal }}
                    open={toggleSnackbarNotification}
                    //onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id"><Icon />{messageNotification}<CloseIcon onClick={this.handleClose} className="close-icon" /></span>}
                />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    closeSnackbarNotification: data => dispatch(closeSnackbarNotification())
});

const mapStateToProps = state => {
    return ({
        common: state.common
    })
};

export default connect( mapStateToProps, mapDispatchToProps )(SnackbarNotification);