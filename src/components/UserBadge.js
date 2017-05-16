/**
 * Created by Vittorio on 16/05/2017.
 */

import React from "react";
import Popover from "material-ui/Popover";
import Menu from "material-ui/Menu";
import MenuItem from "material-ui/MenuItem";
import {Avatar, Divider} from "material-ui";
import Post from "../model/Post";

export default class UserBadge extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };
    }

    handleTouchTap = (event) => {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    render() {
        return (
            <div>
                <Avatar
                    onTouchTap={this.handleTouchTap}
                    label="Click me"
                    src={Post.getAvatar(this.props.loggedInId, 100)}
                    style={this.props.style}
                />
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                >
                    <Menu>
                        <MenuItem primaryText={this.props.loggedInUsername}/>
                        <Divider/>
                        <MenuItem primaryText="Help &amp; feedback"/>
                        <MenuItem primaryText="Settings"/>
                        <MenuItem primaryText="Sign out" onTouchTap={() => this.props.handleLogout()}/>
                    </Menu>
                </Popover>
            </div>
        );
    }
}