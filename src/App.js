import React, {Component} from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import PageManager from "./PageManager";
import "./css/App.css";

// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors
const muiTheme = getMuiTheme({
    palette: {
        primary1Color: "#8BC34A",
        primary2Color: "#689F38",
        primary3Color: "#DCEDC8",
        accent1Color: "#FF9800",
        // accent2Color: "#FF9800",
        // accent3Color: grey500,
        textColor: "#212121",
        //alternateTextColor: "#eeffe1",
        canvasColor: "#fff",
        borderColor: "#BDBDBD",
    }
});

/*
 // APP HIERARCHY

 App
 PageManager
 - TopBar
 -- LeftIcon
 -- CenterComponent
 --- Title|SearchBar
 -- RightIcon
 - SideBar
 - PageContainer

 */

class App extends Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <PageManager />
            </MuiThemeProvider>
        );
    }
}


export default App;