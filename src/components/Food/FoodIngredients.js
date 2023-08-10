import React, { Component } from "react";
// import Wrapper from "../../hoc/Wrapper";
import PropTypes from 'prop-types';

class FoodIngredients extends Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        let ingredient = null;
        switch (this.props.type) {
            case 'topBread':
                ingredient = <div className="text-amber-700 font-bold">🍞 Top Bread</div>;
                break;
                case 'botBread':
                    ingredient = <div className="text-amber-700 font-bold">🍞 Bottom Bread</div>;
                break;
                case 'hotDog':
                    ingredient = <div className="text-orange-500 bg-red-100 my-1 py-2 w-1/4 mx-auto rounded-md">Hot Dog</div>;
                break;
                case 'lettuce':
                    ingredient = <div className="text-green-600 bg-red-100 my-1 py-2 w-1/4 mx-auto rounded-md">Lettuce</div>;
                break;
                case 'onion':
                    ingredient = <div className="text-fuchsia-900 bg-red-100 my-1 py-2 w-1/4 mx-auto rounded-md">Onion</div>;
                    break;
            default:
                ingredient = null;
        }

        return ingredient;
    }
}

FoodIngredients.propTypes = {
    type: PropTypes.string.isRequired,
};

export default FoodIngredients;