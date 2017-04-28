import React from "react";

export default class SecondPage extends React.Component {
    static pageProperty = {
        title: 'SecondPage',
        showSearchBar: true,
        showButtonOkay: false,
        parentPage: 'Home'
    };

    render() {
        return (
            <div >
                <button onClick={() => this.props.openPage('Home')}>Back</button>
                {this.props.searchBarValue.searchBarValue}
            </div>
        );
    }
}