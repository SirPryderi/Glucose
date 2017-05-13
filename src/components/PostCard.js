import React from "react";
import {Card, CardHeader, CardText, CardTitle} from "material-ui/Card";
import Paper from "material-ui/Paper";

const style = {
    display: 'inline-block',
    marginBottom: 30
};

const PostCard = (props) => (
    <Paper style={style}>
        <Card>
            <CardHeader
                title={props.post.authorUsername}
                subtitle={props.post.date}
                avatar={props.post.getAvatarUrl()}
            />
            <CardTitle title={props.post.title}/>
            <CardText>{props.post.body}</CardText>
        </Card>
    </Paper>
);

export default PostCard;