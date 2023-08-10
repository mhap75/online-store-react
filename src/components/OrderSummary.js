import React, { Component } from "react";
import Wrapper from "../hoc/Wrapper";
import Button from "./UI/Button/Button";



class OrderSummary extends Component {

    // componentDidUpdate() {
    //     console.log('[OrderSummary has been updated]');
    // }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map(ingKey => (
            <li key={ingKey}><span>{ingKey}</span>: {this.props.ingredients[ingKey]}</li>
        ));

        return (
            <Wrapper>
                <h4>محتویات سفارش شما</h4>
                <ul>
                    {ingredientSummary}
                </ul>
                <div className="mt-2">
                    <Button clicked={this.props.checkout} classes="mx-1 hover:bg-green-300 bg-green-200 text-green-700 px-2 py-1 rounded">پرداخت</Button>
                    <Button clicked={this.props.clicked} classes="mx-1 hover:bg-red-300 bg-red-200 text-red-700 px-2 py-1 rounded">انصراف</Button>
                </div>
            </Wrapper>
        );
    }
};

export default OrderSummary;