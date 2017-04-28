/**
 * Created by Vittorio on 09/12/2016.
 */
import React from "react";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import AppBar from "material-ui/AppBar";
import FontIcon from "material-ui/FontIcon";

export default class DrawerSimpleExample extends React.Component {
    render() {
        const that = this;

        const homeIcon = <FontIcon className="material-icons">home</FontIcon>;
        const listIcon = <FontIcon className="material-icons">view_list</FontIcon>;

        function openPage(page) {
            that.props.handleIconClick();
            that.props.openPage(page);
        }

        return (
            <Drawer open={this.props.open} docked={false}>
                <AppBar title="Glucose" onLeftIconButtonTouchTap={() => this.props.handleIconClick()}/>

                <MenuItem onClick={() => openPage("Home")}
                          leftIcon={homeIcon}>Home</MenuItem>
                <MenuItem onClick={() => openPage("FoodsListPage")}
                          leftIcon={listIcon}>Food List</MenuItem>
            </Drawer>
        );
    }
}