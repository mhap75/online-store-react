import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import * as actionTypes from "../../Redux/authAction";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Navigate } from "react-router-dom";

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            controls: {
                email: {
                    label: 'ایمیل',
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'hey@mail.com',
                    },
                    value: '',
                    validation: {
                        required: true,
                        isEmail: true,
                    },
                    valid: false,
                    touched: false,
                },
                password: {
                    label: 'رمز عبور',
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder: 'رمز عبور',
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 8,
                    },
                    valid: false,
                    touched: false,
                }
            }
        };
    }

    checkValidity(value, rule) {
        let isValid = true;
        if (!rule) {
            return true;
        }
        if (rule.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rule.minLength) {
            isValid = value.length >= rule.minLength && isValid;
        }
        if (rule.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid;
        }
        return isValid;
    }

    inputChange = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({ controls: updatedControls });
    };

    loginRequest = (event) => {
        event.preventDefault();
        this.props.oAuth(this.state.controls.email.value, this.state.controls.password.value);
    };

    render() {

        const formElementArray = [];
        for (const key in this.state.controls) {
            formElementArray.push({ id: key, config: this.state.controls[key] });
        }
        let form = formElementArray.map(formElement => (
            <Input
                label={formElement.config.label}
                key={formElement.id}
                id={formElement.id}
                type={formElement.config.elementConfig.type}
                validity={formElement.config.valid ? 1 : 0}
                shouldvalidate={formElement.config.validation.required ? 1 : 0}
                touched={formElement.config.touched ? 1 : 0}
                value={formElement.config.value}
                placeholder={formElement.config.elementConfig.placeholder}
                name={formElement.config.elementConfig.name}
                onChange={(event) => this.inputChange(event, formElement.id)}
            />
        ));

        if (this.props.loading) {
            form = <Spinner />;
        }

        let isLoggedIn;
        if (this.props.isLoggedIn) {
            isLoggedIn = <Navigate to='/' replace={true} />;
        }

        return (
            <div className="px-5">
                {isLoggedIn}
                <form>
                    {form}
                    <button
                        onClick={this.loginRequest}
                        className="mt-4 mb-8 w-full rounded-md hover:opacity-80 bg-blue-500 px-6 py-3 font-medium text-white disabled:opacity-50"
                    // disabled={}
                    >
                        ورود
                    </button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isLoggedIn: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        oAuth: (email, password) => dispatch(actionTypes.auth(email, password)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);