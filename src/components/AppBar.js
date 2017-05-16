/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
import React from "react";
import FontIcon from "material-ui/FontIcon";
import IconButton from "material-ui/IconButton";
import AutoComplete from "material-ui/AutoComplete";
import AppBar from "material-ui/AppBar";
import UserBadge from "./UserBadge";
import {RaisedButton} from "material-ui";

export default class GlucoseAppBar extends React.Component {
    render() {
        const leftIcon = this.props.barState.showButtonBack ?
            <IconButton><FontIcon className="material-icons">arrow_back</FontIcon></IconButton> : null;

        let rightIcon;

        if (!this.props.barState.showSearchBar) {
            if (this.props.barState.showButtonOkay) {
                rightIcon = <IconButton><FontIcon className="material-icons">done</FontIcon></IconButton>;
            } else {
                if (this.props.loggedInId)
                    rightIcon =
                        <UserBadge style={{marginTop: 4, marginRight: 8}}
                                   loggedInId={this.props.loggedInId}
                                   loggedInUsername={this.props.loggedInUsername}
                                   handleLogout={() => this.props.handleLogout()}
                        />;
                else
                    rightIcon = <RaisedButton label="Login" style={{marginTop: 6, marginRight: 8}}
                                              onTouchTap={() => this.props.handleOpenLoginModal()}/>
            }

        } else {
            rightIcon = <IconButton><FontIcon className="material-icons">search</FontIcon></IconButton>;
        }

        const searchBarMargin = 64;

        const children = this.props.barState.showSearchBar ?
            <div style={{
                color: "#fff",
                position: "absolute",
                top: -18,
                left: searchBarMargin,
                right: searchBarMargin,
            }}>
                <AutoComplete
                    //hintText="Search"
                    dataSource={["ciao", "mela"]}
                    onUpdateInput={this.props.handleSearchBarUpdateInput}
                    floatingLabelText="Search"

                    underlineFocusStyle={{
                        borderColor: "#fff"
                    }}

                    floatingLabelFocusStyle={{
                        color: "#fff",
                        bottom: 10
                    }}

                    inputStyle={{
                        color: '#fff'
                    }}
                    fullWidth={true}

                />
            </div>
            : null;

        const title = this.props.barState.showSearchBar ? null : "Glucose";

        return (<AppBar
            title={title}
            style={{position: "fixed"}}
            titleStyle={{fontFamily: "Ubuntu"}}
            onLeftIconButtonTouchTap={() => this.props.handleIconClick()}
            iconElementLeft={leftIcon}
            iconElementRight={rightIcon}
            children={children}
        />);
    }
}