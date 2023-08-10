import React, { Component } from "react";
import Wrapper from "../hoc/Wrapper";
import Food from "../components/Food/Food";
import FoodControls from "../components/Food/FoodControls";
import Modal from "../components/UI/Modal/Modal";
import OrderSummary from "../components/OrderSummary";
import axios from "../axios-orders";
import Spinner from "../components/UI/Spinner/Spinner";
import ErrorHandler from "../hoc/ErrorHandler";
import WithRouter from "../hoc/WithRouter";
import { connect } from "react-redux";
import * as foodActions from "../Redux/index";

class FoodBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchasable: false,
            purchasing: false,
            loading: false,
        };
    }


    updatePurchaseState(state) {
        const sum = Object.keys(state).map(ingKey => (state[ingKey])).reduce((sum, key) => sum + key, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isLoggedIn) {
            this.setState({ purchasing: !this.state.purchasing });
        } else {
            this.props.router.navigate({
                pathname: '/auth',
            });
        }
    };

    checkout = () => {
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.props.price,
            customer: {
                name: 'Hamid',
                userId: 'dw9WSD',
                phone: '309409384'
            }
        };
        setTimeout(() => {
            axios.post('posts', order).then((response) => {
                this.setState({ loading: false, purchasing: false });
                this.props.router.navigate({
                    pathname: '/checkout',
                });
            }).catch((error) => {
                this.setState({ loading: false, purchasing: false });
                console.log(error);
            });
        }, 2000);
    };

    componentDidMount() {
        // axios.get('posts').then((response) => {console.log(response);});
    }


    render() {
        let orderSummary = <OrderSummary
            ingredients={this.props.ings}
            clicked={this.purchaseHandler}
            checkout={this.checkout}
        />;

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        const disableInfo = {
            ...this.props.ings,
        };

        for (const key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        return (
            <Wrapper>
                <Modal show={this.state.purchasing}>
                    {orderSummary}
                </Modal>
                <Food ingredients={this.props.ings} />
                <FoodControls
                    addIngredient={this.props.onIngredinetAdded}
                    removeIngredient={this.props.onIngredinetRemoved}
                    disabled={disableInfo}
                    purchasable={this.updatePurchaseState(this.props.ings) || !this.props.isLoggedIn}
                    price={this.props.price}
                    ordered={this.purchaseHandler}
                    isLoggedIn={this.props.isLoggedIn}
                />
            </Wrapper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.food.ingredients,
        price: state.food.totalPrice,
        isLoggedIn: state.auth.token !== null
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredinetAdded: (ingName) => dispatch(foodActions.addIngredient(ingName)),
        onIngredinetRemoved: (ingName) => dispatch(foodActions.removeIngredient(ingName)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(WithRouter(FoodBuilder), axios));
