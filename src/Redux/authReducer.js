import * as actionTypes from "./actionTypes";
import { updateObj } from "../util/updateObj";

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,

};

const authInitiation = (state, action) => {
    return updateObj(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
    return updateObj(state, { error: null, loading: false, token: action.token, userId: 1 });
};

const authFailure = (state, action) => {
    return updateObj(state, { error: action.error, loading: false });
};

const logout = (state, action) => {
    return updateObj(state, { token: null, userId: null });
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_PN:
            return authInitiation(state, action);
        case actionTypes.AUTH_OK:
            return authSuccess(state, action);
        case actionTypes.AUTH_NO:
            return authFailure(state, action);
        case actionTypes.LOGOUT:
            return logout(state, action);
        default:
            return state;
    }
};

export default authReducer;