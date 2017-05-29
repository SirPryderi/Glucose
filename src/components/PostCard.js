import React from "react";
import {Card, CardHeader, CardText, CardTitle} from "material-ui/Card";
import Paper from "material-ui/Paper";
import {ActionDelete, ContentCreate} from "material-ui/svg-icons/index";
import {IconButton} from "material-ui";
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

const PostCard = (props) => (
    <Paper style={style}>
        <Card>
            <CardHeader
                title={decodeHtml(props.post.authorUsername)}
                subtitle={props.post.date}
                avatar={props.post.getAvatarUrl()}
            >
                <div style={toolsStyle}>
                    <IconButton tooltip="Delete post" touch={true} tooltipPosition="bottom-left"
                                onTouchTap={() => {
                                    Post.removePost(props.post.id, (status) => {
                                        if (status.status === "success") {
                                            props.handleRemove(props.post);
                                        } else {
                                            alert("Failed to remove the post. " + status.message);
                                        }
                                    });


                                }}>
                        <ActionDelete />
                    </IconButton>
                    <IconButton tooltip="Edit post" touch={true} tooltipPosition="bottom-left">
                        <ContentCreate />
                    </IconButton>
                </div>
            </CardHeader>
            <CardTitle title={props.post.title}/>
            <CardText>{decodeHtml(props.post.body).split("\n").map((i, index) => {
                return <p key={index}>{i}</p>;
            })}</CardText>
        </Card>
    </Paper>
);

export default PostCard;