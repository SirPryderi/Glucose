/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import {TextField} from "material-ui";
import Post from "../model/Post";

export default class PostDialog extends React.Component {
    state = {
        submitEnabled: false,
        postTitle: '',
        postText: ''
    };

    validate = () => {
        this.setState({submitEnabled: (this.state.postTitle.length > 0 && this.state.postText.length > 0)});
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.props.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                disabled={!this.state.submitEnabled}
                onTouchTap={() => {

                    Post.addPost(this.state.postTitle, this.state.postText, (status) => {

                        if (status.status === "success") {
                            this.props.appendPost(status.post);
                            this.props.handleClose()
                        } else {
                            alert("Failed to publish the post. " + status.message);
                        }


                    });

                }}
            />,
        ];

        return (
            <Dialog
                title="New Post"
                actions={actions}
                modal={true}
                open={this.props.open}
            >

                Write a new post.<br />

                <TextField
                    floatingLabelText="Title"
                    hintText="Title"
                    style={{width: "100%"}}
                    onChange={(_, value) => {
                        this.setState({postTitle: value}, () => {
                            this.validate();
                        });
                    }}
                /><br/>

                <TextField
                    hintText="Post Content"
                    floatingLabelText="Post Content"
                    multiLine={true}
                    style={{width: "100%"}}
                    onChange={(_, value) => {
                        this.setState({postText: value}, () => {
                            this.validate();
                        });

                    }}
                    rows={1}
                /><br />

            </Dialog>
        );
    }
}