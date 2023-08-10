import * as actionTypes from "./actionTypes";
import { updateObj } from "../util/updateObj";

const initialState = {
    ingredients: {
        hotDog: 0,
        lettuce: 0,
        onion: 0,
    },
    totalPrice: 0,
    prices: {
        hotDog: 25000,
        lettuce: 5000,
        onion: 7000,
    },

};

const addIngredient = (state, action) => {
    const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    };
    const updatedIngredients = updateObj(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + state.prices[action.ingredientName]
    };

    return updateObj(state, updatedState);
};

const removeIngredient = (state, action) => {
    const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    };
    const updatedIngredients = updateObj(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - state.prices[action.ingredientName]
    };

    return updateObj(state, updatedState);
};

const foodReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_ING:
            return addIngredient(state, action);
        case actionTypes.REM_ING:
            return removeIngredient(state, action);
        default:
            return state;
    }
};

export default foodReducer;