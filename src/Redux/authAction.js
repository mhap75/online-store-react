import * as actionTypes from "./actionTypes";
import axios from "../axios-orders";

export const authPending = () => {
    return {
        type: actionTypes.AUTH_PN
    };

};


export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_OK,
        token: token,
        userId: userId
    };
};


export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_NO,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    return {
        type: actionTypes.LOGOUT
    };
};

export const timeOut = (expected) => {
    return dispatch => {
        setTimeout(() => dispatch(logout()), expected);
    };
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authPending());
        const authData = {
            email: email,
            password: password
        };
        axios.post('posts', authData).then((response) => {
            console.log(response);
            localStorage.setItem('token', 'oiejfop*W*Ukdjoijawoidjwud8waud09widwajidjowijd')
            dispatch(authSuccess({
                token: 'oiejfop*W*Ukdjoijawoidjwud8waud09widwajidjowijd',
                userId: 1
            }));
            // dispatch(timeOut(3000));
        }).catch(err => {
            console.log(err);
            dispatch(authFailed(err));
        });;
    };
};