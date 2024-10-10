import React from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { Link } from 'react-router-dom';

class MainMenu extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
            open: false
        }

        this.handleToggle = this.handleToggle.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleToggle() {
        this.setState(state => ({ open: !state.open }));
    };
    
    handleClose(event) {
        if (this.anchorEl.contains(event.target)) {
            return;
        }

        this.setState({ open: false });
    };

    render() {
        const { open } = this.state;

        return(
            <div>
                <Button
                    buttonRef={node => {
                    this.anchorEl = node;
                    }}
                    aria-owns={open ? 'menu-list-grow' : null}
                    aria-haspopup="true"
                >
                    <Link className="link" to="/">Home</Link>
                </Button>
                    <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            id="menu-list-grow"
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper>
                            <ClickAwayListener onClickAway={this.handleClose}>
                                <MenuList>
                                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                <MenuItem onClick={this.handleClose}>My account</MenuItem>
                                <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                            </Paper>
                        </Grow>
                        )}
                    </Popper>
                <Button
                    buttonRef={node => {
                    this.anchorEl = node;
                    }}
                    aria-owns={open ? 'menu-list-grow' : null}
                    aria-haspopup="true"
                >
                    <Link className="link" to="/">Tech</Link>
                </Button>
                <Button
                    buttonRef={node => {
                    this.anchorEl = node;
                    }}
                    aria-owns={open ? 'menu-list-grow' : null}
                    aria-haspopup="true"
                >
                    <Link className="link" to="/">Design</Link>
                </Button>
                {/* <Button
                    buttonRef={node => {
                    this.anchorEl = node;
                    }}
                    aria-owns={open ? 'menu-list-grow' : null}
                    aria-haspopup="true"
                >
                    Science
                </Button> */}
                <Button
                    buttonRef={node => {
                    this.anchorEl = node;
                    }}
                    aria-owns={open ? 'menu-list-grow' : null}
                    aria-haspopup="true"
                >
                    <Link className="link" to="/">Contact</Link>
                </Button>
                {/* <Button
                    buttonRef={node => {
                    this.anchorEl = node;
                    }}
                    aria-owns={open ? 'menu-list-grow' : null}
                    aria-haspopup="true"
                >
                    <Link to="/article/editor">New Article</Link>
                </Button> */}
            </div>
        );
    }
}

export default connect()(MainMenu);