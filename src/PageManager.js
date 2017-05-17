/**
 * PageManager handle the page changing and other useless stuff. Bye. I hate writing comments. Really. Farewell.
 */
import React from "react";
import NavigationDrawer from "./components/NavigationDrawer";
import Food from "./model/Food";
import GlucoseAppBar from "./components/AppBar";
import LoginDialog from "./dialogs/LoginDialog";
import Main from "./pages/Main";
import SecondPage from "./pages/SecondPage";
import FoodPage from "./pages/FoodPage";
import FoodsListPage from "./pages/FoodsListPage";
import axios from "axios";

export default class PageManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            barState: {
                showSearchBar: false,
                showButtonOkay: false,
                showButtonBack: false,
            },

            currentPage: 'Home',

            currentPageParam: null,

            parentPage: null,

            openDrawer: false,

            openLoginModal: false,

            searchBarValue: '',

            loggedInId: null,

            loggedInUsername: null,

            foods: Food.getFoodList()
        };
    }

    componentDidMount() {
        const that = this;

        that.openPageNoHistory('Home');

        window.onpopstate = (e) => {
            if (that.state.parentPage) {
                that.openPageNoHistory(this.state.parentPage);
            }
            // history.back();

            //
            // if (this.state.parentPage !== null) {
            //     this.openPage(this.state.parentPage);
            //     e.stopPropagation();
            // } else {
            //
            // }
        };

        axios.get("api/whoami.php")
            .then(response => {
                if (response.data !== null)
                    that.setState({loggedInUsername: response.data.username, loggedInId: response.data.userid})
            })
            .catch(error => {
                console.error("Failed to retrieve current user.", error);
            })
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
        const content = this.getContent(what, param);

        if (typeof content.type.pageProperty !== "undefined") {
            this.setState({
                barState: {
                    showSearchBar: content.type.pageProperty.showSearchBar,
                    showButtonOkay: content.type.pageProperty.showButtonOkay,
                    showButtonBack: content.type.pageProperty.parentPage !== null
                },
                parentPage: content.type.pageProperty.parentPage,
                currentPage: what,
                currentPageParam: param
            });
        }
    }

    openPage(what, param) {
        history.pushState({page: what}, what);

        this.openPageNoHistory(what, param);
    }

    getContent(what, param) {
        let content;

        switch (what) {
            case 'Main':
            case 'Home':
                content = <Main searchBarValue={this.state}
                                openPage={(what) => this.openPage(what)}
                                loggedInUsername={this.state.loggedInUsername}/>;
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

        return content;
    }

    getPage() {
        return this.getContent(this.state.currentPage, this.state.currentPageParam);
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

    setUser(userid, username) {
        this.setState({loggedInId: parseInt(userid, 10), loggedInUsername: username});
    }

    handleOpenLoginModal() {
        this.setState({openLoginModal: true});
    }

    handleCloseLoginModal() {
        this.setState({openLoginModal: false});
    }

    handleLogout(){
        axios.get("api/logout.php").then(()=>{
            this.setState({loggedInId: null, loggedInUsername: null});
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
                <GlucoseAppBar handleIconClick={() => this.toggleDrawer()}
                               barState={this.state.barState}
                               handleSearchBarUpdateInput={(hi) => this.handleSearchBarUpdateInput(hi)}
                               handleOpenLoginModal={() => this.handleOpenLoginModal()}
                               handleLogout={() => this.handleLogout()}
                               loggedInId={this.state.loggedInId}
                               loggedInUsername={this.state.loggedInUsername}

                />
                <NavigationDrawer open={this.state.openDrawer}
                                  handleIconClick={() => this.toggleDrawer()}
                                  openPage={(what, param) => this.openPage(what, param)}/>
                <div style={{padding: 20, paddingTop: 90}}>
                    {this.getPage()}
                </div>
                <div>{this.state.searchBarValue}</div>
                <LoginDialog open={this.state.openLoginModal}
                             setUser={(id, username) => this.setUser(id, username)}
                             handleClose={() => this.handleCloseLoginModal()}
                />
            </div>
        );
    }
}
