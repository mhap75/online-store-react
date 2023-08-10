import React, { Component } from "react";
import Wrapper from "../hoc/Wrapper";
import Input from "../components/UI/Input/Input";
import axios from "../axios-orders";
import { connect } from "react-redux";

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderForm: {
                card: {
                    elementType: "input",
                    elementConfig: {
                        type: 'text',
                        placeholder: 'XXX-XXX-XXX-XXX',
                        name: 'card-no'
                    },
                    value: '',
                    label: 'شماره کارت',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                },
                expDate: {
                    elementType: "input",
                    elementConfig: {
                        type: 'text',
                        placeholder: '01/01',
                        name: 'card-exp'
                    },
                    value: '',
                    label: 'تاریخ انقضا',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                },
                cvv2: {
                    elementType: "input",
                    elementConfig: {
                        type: 'text',
                        placeholder: '1234',
                        name: 'card-ccv2'
                    },
                    value: '',
                    label: 'CVV2',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                },
            },
            valid: false,
        };
    }

    goBack = () => {
        this.props.router.navigate(-1);
    };

    checkValidity(value, rule) {
        let isValid = false;
        if (rule.required) {
            isValid = value.trim() !== '';
        }
        return isValid;
    }

    paymentRequest = (event) => {
        event.preventDefault();
        const cardData = {};
        for (const cardElementIdetifier in this.state.orderForm) {
            cardData[cardElementIdetifier] = this.state.orderForm[cardElementIdetifier].value;
        }
        const order = {
            cardInfo: cardData,
            price: this.props.price + 20000
        };
        axios.post('posts', order).then(
            (response) => console.log(response)
        ).catch(err => console.log(err));
    };

    inputChange = (event, inputIdentifier) => {
        const updatedCardInfo = {
            ...this.state.orderForm
        };
        const updatedCardElement = {
            ...updatedCardInfo[inputIdentifier]
        };
        updatedCardElement.value = event.target.value;
        updatedCardElement.touched = true;
        updatedCardElement.valid = this.checkValidity(updatedCardElement.value, updatedCardElement.validation);
        updatedCardInfo[inputIdentifier] = updatedCardElement;
        let validation = true;
        for (const inputIdentifier in updatedCardInfo) {
            validation = updatedCardInfo[inputIdentifier].valid && validation;
        }
        this.setState({ orderForm: updatedCardInfo, valid: validation });
    };

    render() {
        const checkoutPrice = (this.props.price + 20000).toLocaleString(
            "fa-IR"
        );

        const formElementArray = [];
        for (const key in this.state.orderForm) {
            formElementArray.push({ id: key, config: this.state.orderForm[key] });
        }
        let form = (
            formElementArray.map(formElement => (
                <Input
                    label={formElement.config.label}
                    key={formElement.id}
                    id={formElement.id}
                    inputtype={formElement.config.elementType}
                    type={formElement.config.elementConfig.type}
                    validity={formElement.config.valid ? 1 : 0}
                    shouldvalidate={formElement.config.validation.required ? 1 : 0}
                    touched={formElement.config.touched ? 1 : 0}
                    value={formElement.config.value}
                    placeholder={formElement.config.elementConfig.placeholder}
                    name={formElement.config.elementConfig.name}
                    onChange={(event) => this.inputChange(event, formElement.id)}
                />
            )
            )
        );

        return (
            <Wrapper>
                <form className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                    <p className="text-xl font-medium">اطلاعات پرداخت</p>
                    <div className="mt-2 md:mt-5">
                        <div className="flex gap-2">
                            {form}
                        </div>
                        <div className="mt-6 border-t border-b py-2">
                            <div className="flex items-center justify-between">
                                <p className="text-lg text-gray-900">
                                    هزینه سفارش
                                </p>
                                <p className="text-gray-900">
                                    {this.props.price.toLocaleString(
                                        "fa-IR"
                                    )}{" "}
                                    تومان
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-lg text-gray-900">
                                    هزینه ارسال
                                </p>
                                <p className="text-gray-900">۲۰,۰۰۰ تومان</p>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-between">
                            <p className="text-lg font-medium text-gray-900">
                                مجموع پرداخت
                            </p>
                            <p className="font-bold text-gray-900">
                                {checkoutPrice} تومان
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={this.paymentRequest}
                            className="mt-4 mb-8 w-full rounded-md hover:opacity-80 bg-green-500 px-6 py-3 font-medium text-white disabled:opacity-50"
                            disabled={!this.state.valid}
                        >
                            پرداخت
                        </button>
                        <button
                            className="flex-1 mt-4 mb-8 w-full hover:opacity-80 rounded-md bg-red-500 px-6 py-3 font-medium text-white"
                            onClick={this.goBack}
                            type="button"
                        >
                            انصراف
                        </button>
                    </div>
                </form>
            </Wrapper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        price: state.food.totalPrice
    };
};

export default connect(mapStateToProps)(Checkout);
