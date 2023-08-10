import React from "react";
import FoodIngredients from "./FoodIngredients";

const Food = (props) => {
    let transformIngredients = Object.keys(props.ingredients).map(ingKey => {
        return [...Array(props.ingredients[ingKey])].map((_, i) => {
            return <FoodIngredients key={ingKey + i} type={ingKey} />;
        });
    }).reduce((arr, el) => {
        return arr.concat(el);
    }, []);

    if (transformIngredients.length === 0) {
        transformIngredients = <p className="p-2 shadow-lg border border-gray-100 my-2 rounded-md">لطفا مواد غذایی خود را انتخاب کنید</p>;
    }

    return (
        <div>
            <FoodIngredients type='topBread' />
            {transformIngredients}
            <FoodIngredients type='botBread' />
        </div>
    );
};

export default Food;