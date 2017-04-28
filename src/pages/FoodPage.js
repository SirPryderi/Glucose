/**
 * Created by Vittorio on 26/04/2017.
 */
import React from "react";
import Paper from "material-ui/Paper";
import FoodButtons from "../components/FoodButtons";
import IconValue from "../components/IconValue";
import Food from "../model/Food";
import imgPlaceholder from "../imgs/background.svg";

export default class FoodPage extends React.Component {
    static pageProperty = {
        title: 'SecondPage',
        showSearchBar: false,
        showButtonOkay: false,
        parentPage: 'FoodsListPage'
    };

    render() {
        if (!this.props.food instanceof Food) {
            console.error("Food parameter is mandatory. " + typeof this.props.param + " found instead.");
            return;
        }

        const sideMargin = -20;
        const food = this.props.food;

        const calories = food.calories + " kJ";
        const glucose = food.glucose + " g";

        const img = food.picture ? food.picture : imgPlaceholder;

        return (
            <div>
                <Paper style={{
                    maxHeight: 250,
                    overflow: "hidden",
                    marginLeft: sideMargin,
                    marginRight: sideMargin,
                    borderRadius: 0,
                    marginTop: -26
                }}
                >
                    <img src={img}
                         style={{width: "100%", marginBottom: -5}} role="presentation"/>
                </Paper>
                <h1 style={{textAlign: "center", fontVariant: "small-caps"}}>{food.name}</h1>

                <FoodButtons/>

                <div>
                    <IconValue icon="whatshot" text={calories}/>
                    <IconValue icon="local_gas_station" text={glucose}/>
                </div>
            </div>
        );
    }
}