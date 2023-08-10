import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../Redux/index";
import { Navigate } from "react-router-dom";

class Logout extends Component {

    componentDidMount() {
        this.props.onLogout();
    }

    render() {
        return (
            <Navigate to="/" replace={false} />
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    };
};

export default connect(null, mapDispatchToProps)(Logout);