/**
 * Created by Vittorio on 26/04/2017.
 */
import React, {Component} from "react";
import FontIcon from "material-ui/FontIcon";
import {BottomNavigation, BottomNavigationItem} from "material-ui/BottomNavigation";

const recentIcon = <FontIcon className="material-icons">add</FontIcon>;
const favoriteIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const editIcon = <FontIcon className="material-icons">create</FontIcon>;

/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */
class FoodButtons extends Component {
    state = {
        selectedIndex: 0,
    };

    select = (index) => this.setState({selectedIndex: index});

    render() {
        return (
            <div>
                <BottomNavigation selectedIndex={this.state.selectedIndex}>
                    <BottomNavigationItem

                        icon={recentIcon}
                        onTouchTap={() => this.select(0)}
                    />
                    <BottomNavigationItem
                        icon={favoriteIcon}
                        onTouchTap={() => this.select(1)}
                    />
                    <BottomNavigationItem

                        icon={editIcon}
                        onTouchTap={() => this.select(2)}
                    />
                </BottomNavigation>
            </div>
        );
    }
}

export default FoodButtons;