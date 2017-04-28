/**
 * Created by Vittorio on 26/04/2017.
 */
import React, {Component} from "react";
import FontIcon from "material-ui/FontIcon";

/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */
class IconValue extends Component {
    render() {
        const icon = <FontIcon className="material-icons" color="grey">{this.props.icon}</FontIcon>;

        return (
            <div style={{maxWidth: 360, margin: "auto", marginTop: 20, fontSize: 22, color: "grey"}}>
                {icon} <span style={{float: 'right'}}>{this.props.text}</span>
            </div>
        );
    }
}

export default IconValue;