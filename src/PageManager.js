import React from "react";
import NavigationDrawer from "./components/NavigationDrawer";
import AppBar from "./components/AppBar";
import Main from "./pages/Main";
import SecondPage from "./pages/SecondPage";
import FoodPage from "./pages/FoodPage";
import FoodsListPage from "./pages/FoodsListPage";
import Food from "./model/Food";

/**
 * PageManager handle the page changing and other useless stuff. Bye. I hate writing comments. Really. Farewell.
 */

export default class PageManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            barState: {
                showSearchBar: false,
                showButtonOkay: false,
                showButtonBack: false,
            },

            parentPage: null,

            openDrawer: false,

            searchBarValue: '',

            foods: Food.getFoodList()
        };
    }

    componentDidMount() {
        this.openPageNoHistory('Home');

        window.onpopstate = (e) => {
            if (this.state.parentPage) {
                this.openPageNoHistory(this.state.parentPage);
            }
            // history.back();

            //
            // if (this.state.parentPage !== null) {
            //     this.openPage(this.state.parentPage);
            //     e.stopPropagation();
            // } else {
            //
            // }
        }
    }

    toggleDrawer() {
        if (this.state.parentPage !== null) {
            //this.openPage(this.state.parentPage);
            history.back();
        } else {
            this.setState({
                openDrawer: !this.state.openDrawer
            });
        }
    }

    openPageNoHistory(what, param) {
        let content;

        switch (what) {
            case 'Home':
                content = <Main searchBarValue={this.state}
                                openPage={(what) => this.openPage(what)}/>;
                //alert(Main.pageProperty.title);
                break;

            case 'SecondPage':
                content = <SecondPage searchBarValue={this.state}
                                      openPage={(what, param) => this.openPage(what, param)}/>;
                break;

            case 'FoodPage':
                if (!param instanceof Food || typeof param === "undefined") {
                    content = <div><strong>Error</strong> - Page needs a food parameter.</div>;
                    break;
                }

                content = <FoodPage searchBarValue={this.state}
                                    openPage={(what) => this.openPage(what)}
                                    food={param}/>;
                break;

            case 'FoodsListPage':
                content = <FoodsListPage searchBarValue={this.state}
                                         openPage={(what, param) => this.openPage(what, param)}
                                         foods={this.state.foods}/>;
                break;
            default:
                content = <div><strong>404</strong> - page not found.</div>
        }

        if (typeof content.type.pageProperty !== "undefined") {
            this.setState({
                barState: {
                    showSearchBar: content.type.pageProperty.showSearchBar,
                    showButtonOkay: content.type.pageProperty.showButtonOkay,
                    showButtonBack: content.type.pageProperty.parentPage !== null
                },
                parentPage: content.type.pageProperty.parentPage
            });
        }

        this.setState({
            content: content
        })
    }

    openPage(what, param) {
        history.pushState({page: what}, what);

        this.openPageNoHistory(what, param);
    }

    handleMe() {
        this.setState({
            barState: {
                showSearchBar: this.state.barState.showSearchBar,
                showButtonOkay: this.state.barState.showButtonOkay,
                showButtonBack: !this.state.barState.showButtonBack
            }
        });
    }

    handleBar() {
        this.setState({
            barState: {
                showSearchBar: !this.state.barState.showSearchBar,
                showButtonOkay: this.state.barState.showButtonOkay,
                showButtonBack: true
            }
        });
    }

    handleSearchBarUpdateInput(input) {
        this.setState({searchBarValue: input, content: this.state.content});
    }

    render() {
        // if (this.state.content !== undefined)
        //     this.state.content.props.searchBarValue = this.state.searchBarValue;

        return (
            <div>
                <AppBar handleIconClick={() => this.toggleDrawer()} barState={this.state.barState}
                        handleSearchBarUpdateInput={(hi) => this.handleSearchBarUpdateInput(hi)}/>
                <NavigationDrawer open={this.state.openDrawer}
                                  handleIconClick={() => this.toggleDrawer()}
                                  openPage={(what, param) => this.openPage(what, param)}/>
                <div style={{padding: 20, paddingTop: 90}}>
                    {this.state.content}
                </div>
                <div>{this.state.searchBarValue}</div>
                {/*// So, instead of doing this, save the page to a state and generate this using a function, might work*/}
            </div>
        );
    }
}
