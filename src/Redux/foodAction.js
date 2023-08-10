import * as actionTypes from './actionTypes';

export const addIngredient = (name) => (
    { type: actionTypes.ADD_ING, ingredientName: name }
);

export const removeIngredient = (name) => (
    { type: actionTypes.REM_ING, ingredientName: name }
);