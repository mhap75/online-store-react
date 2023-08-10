import React, { Component } from "react";
import Header from "../../components/Header";
import Hamburger from "../../components/Navigation/Hamburger";
import { connect } from "react-redux";

class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showHamburger: false,
        };
    }

    toggleHamburger = () => {
        this.setState((prevState) => {
            return ({ showHamburger: !prevState.showHamburger });
        });
    };

    render() {
        return (
            <div className="container text-center h-screen scroll-smooth mx-auto">
                <Header isLoggedIn={this.props.isLoggedIn} toggleHamMenu={this.toggleHamburger} />
                <Hamburger closeHamMenu={this.toggleHamburger} show={this.state.showHamburger} />
                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);