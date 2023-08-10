import React, { Component } from "react";
import Wrapper from "./Wrapper";
import Modal from "../components/UI/Modal/Modal";
import Button from "../components/UI/Button/Button";

const ErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                error: null,
            };
        }

        componentDidMount() {
            this.requestInterceptor = axios.interceptors.request.use((req) => {
                this.setState({ error: null });
                return req;
            });

            this.responseInterceptor = axios.interceptors.response.use(
                (req) => req,
                (error) => {
                    this.setState({ error: error });
                }
            );
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        confirmError = () => {
            this.setState({ error: null });
        };

        render() {
            return (
                <Wrapper>
                    <Modal show={this.state.error}>
                        {this.state.error ? this.state.error.message : null}
                        <div className="mt-2">
                            <Button clicked={this.confirmError} classes="px-3 py-1 bg-red-200 text-red-500 rounded">Close</Button>
                        </div>
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Wrapper>
            );
        }

    };
};

export default ErrorHandler;