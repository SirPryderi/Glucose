import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import FontIcon from "material-ui/FontIcon";
import FloatingActionButton from "material-ui/FloatingActionButton";
import InsulinBar from "../components/InsulinBar";
import Card from "../components/Card";
import Divider from "material-ui/Divider";

export default class Main extends React.Component {
    static pageProperty = {
        title: 'Glucose',
        showSearchBar: false,
        showButtonOkay: false,
        parentPage: null
    };

    render() {
        return (<div>
            <InsulinBar/>
            <div style={{textAlign: "center"}}>
                <FloatingActionButton style={{margin: 30}} secondary={true}
                                      onClick={() => this.props.openPage('FoodsListPage')}>
                    <FontIcon className="material-icons">local_dining</FontIcon>
                </FloatingActionButton>
                <FloatingActionButton>
                    <FontIcon className="material-icons">colorize</FontIcon>
                </FloatingActionButton>
            </div>
            <RaisedButton label="Open Logs" primary={true} style={{marginBottom: 30}} fullWidth={true}/>

            <Divider style={{marginBottom: 35}}/>

            <h2>Forum News</h2>

            <Card/>

        </div>);
    }
}