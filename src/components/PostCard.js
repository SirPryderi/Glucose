import React from "react";
import {Card, CardHeader, CardText, CardTitle} from "material-ui/Card";
import Paper from "material-ui/Paper";

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

const PostCard = (props) => (
    <Paper style={style}>
        <Card>
            <CardHeader
                title={decodeHtml(props.post.authorUsername)}
                subtitle={props.post.date}
                avatar={props.post.getAvatarUrl()}
            />
            <CardTitle title={props.post.title}/>
            <CardText>{decodeHtml(props.post.body).split("\n").map((i, index) => {
                return <p key={index}>{i}</p>;
            })}</CardText>
        </Card>
    </Paper>
);

export default PostCard;