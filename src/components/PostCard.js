import React from "react";
import {Card, CardHeader, CardText, CardTitle} from "material-ui/Card";
import Paper from "material-ui/Paper";
import {ActionDelete, ContentClear, ContentCreate, NavigationCheck} from "material-ui/svg-icons/index";
import {IconButton, TextField} from "material-ui";
import Post from "../model/Post";

const style = {
    display: 'inline-block',
    marginBottom: 30,
    width: "100%"
};

function decodeHtml(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

const toolsStyle = {
    position: 'absolute',
    top: 5,
    right: 5,
    opacity: 0.7
};

const CardTextContent = ({editing, body, handleEdit}) => {
    return (!editing ?
        <div>
            {decodeHtml(body).split("\n").map((i, index) => {
                return <p key={index}>{i}</p>;
            })}
        </div>
        :
        <TextField
            hintText="Post Content"
            floatingLabelText="Post Content"
            multiLine={true}
            defaultValue={decodeHtml(body)}
            style={{width: "100%"}}
            onChange={(_, value) => handleEdit(value)}
            rows={1}
        />);

};

export default class PostCard extends React.Component {
    constructor(props) {
        super(props);

        const text = this.props.post.body;

        this.state = {
            editing: false,
            postText: text
        }
    }


    render() {
        const EditIcon = () => {
            const firstIcon = !this.state.editing ?
                <IconButton tooltip="Delete post" touch={true} tooltipPosition="bottom-left"
                            onTouchTap={() => {
                                Post.removePost(this.props.post.id, (status) => {
                                    if (status.status === "success") {
                                        this.props.handleRemove(this.props.post);
                                    } else {
                                        alert("Failed to remove the post. " + status.message);
                                    }
                                });


                            }}>
                    <ActionDelete />
                </IconButton>
                :
                <IconButton tooltip="Cancel changes" touch={true} tooltipPosition="bottom-left"
                            onTouchTap={() => {
                                this.setState({editing: !this.state.editing})
                            }}>
                    <ContentClear />
                </IconButton>;

            const secondIcon = !this.state.editing ?
                <IconButton tooltip="Edit post" touch={true} tooltipPosition="bottom-left"
                            onTouchTap={() => {
                                this.setState({editing: !this.state.editing})
                            }}>
                    <ContentCreate />
                </IconButton> :
                <IconButton tooltip="Accept changes" touch={true} tooltipPosition="bottom-left"
                            onTouchTap={() => {
                                if (this.props.post.body !== this.state.postText) {
                                    const post = new Post(this.props.post);
                                    // TODO edited title
                                    post.body = this.state.postText;
                                    this.props.handleEdit(post);

                                    Post.editPost(post, (status) => {
                                        if (status.status === "success") {
                                            this.setState({editing: !this.state.editing})
                                        } else {
                                            alert("Failed to edit post. " + status.message);
                                        }
                                    })
                                } else {
                                    this.setState({editing: !this.state.editing})
                                }
                            }}>
                    <NavigationCheck />
                </IconButton>;

            return <div style={toolsStyle}>
                {firstIcon}
                {secondIcon}
            </div>
        };

        return (
            <Paper style={style}>
                <Card>
                    <CardHeader
                        title={decodeHtml(this.props.post.authorUsername)}
                        subtitle={this.props.post.date}
                        avatar={this.props.post.getAvatarUrl()}
                    >
                        <EditIcon/>
                    </CardHeader>
                    <CardTitle title={this.props.post.title}/>
                    <CardText>
                        <CardTextContent body={this.props.post.body} editing={this.state.editing}
                                         handleEdit={(value) => this.setState({postText: value})}
                        />
                    </CardText>
                </Card>
            </Paper>
        )
    }
}