/**
 * Created by Vittorio on 27/04/2017.
 */
import React from "react";
import {List, ListItem} from "material-ui/List";

export default class FoodsListPage extends React.Component {
    static pageProperty = {
        title: 'SecondPage',
        showSearchBar: false,
        showButtonOkay: false,
        parentPage: 'Home'
    };

    render() {
        const foods = this.props.foods;
        const openPage = this.props.openPage;

        const foodsList = foods.map(function (food, key) {
            return <ListItem
                key={key}
                primaryText={food.name}
                onClick={() => {
                    openPage('FoodPage', food);
                }}
            />;
        });

        return (
            <List style={{margin: -20}}>
                {foodsList}
            </List>
        )
    }
}