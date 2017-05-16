/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import {TextField} from "material-ui";
import * as axios from "axios";

export default class LoginDialog extends React.Component {
    state = {
        submitEnabled: false,
        username: '',
        password: '',
        error: null
    };

    validate = () => {
        this.setState({submitEnabled: (this.state.username.length > 0 && this.state.password.length > 0)});
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.props.handleClose}
            />,
            <FlatButton
                label="Login"
                primary={true}
                disabled={!this.state.submitEnabled}
                onTouchTap={() => {
                    const that = this;
                    axios
                        .post('http://glucose.com/api/login.php', {
                            username: this.state.username,
                            password: this.state.password
                        })
                        .then(function (response) {
                            if(response.data.status === "success"){
                                that.props.setUser(response.data.message, that.state.username);
                                that.props.handleClose();
                            } else {
                                that.setState({error: response.data.message});
                            }

                        })
                        .catch(function (error) {
                            console.error(error);
                        });
                }}
            />,
        ];

        const error = this.state.error ? <p>{this.state.error}</p> : null;

        return (
            <Dialog
                title="Login"
                actions={actions}
                open={this.props.open}
                onRequestClose={this.props.handleClose}
                contentStyle={{maxWidth: 400}}
            >
                {error}
                <TextField
                    floatingLabelText="Username"
                    hintText="Username"
                    style={{width: "100%"}}
                    onChange={(_, value) => {
                        this.setState({username: value}, () => {
                            this.validate();
                        });
                    }}
                /><br/>

                <TextField
                    hintText="Password"
                    floatingLabelText="Password"
                    type="password"
                    style={{width: "100%"}}
                    onChange={(_, value) => {
                        this.setState({password: value}, () => {
                            this.validate();
                        });
                    }}
                    rows={1}
                /><br />

            </Dialog>
        );
    }
}