import React from "react";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import logo from "../imgs/logo.svg";
import Paper from "material-ui/Paper";

const style = {
    display: 'inline-block',
    marginBottom: 30
};

const CardExampleWithAvatar = () => (

    <Paper style={style}>
        <Card>
            <CardHeader
                title="Glucose Team"
                subtitle="Moderator"
                avatar={logo}
            />
            <CardMedia>
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to Glucose</h2>
                </div>
            </CardMedia>
            <CardTitle title="Card title" subtitle="Card subtitle"/>
            <CardText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
            </CardText>
            <CardActions>
                <FlatButton label="Action1"/>
                <FlatButton label="Action2"/>
            </CardActions>
        </Card>
    </Paper>
);

export default CardExampleWithAvatar;