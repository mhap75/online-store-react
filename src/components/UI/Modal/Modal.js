import React, { Component } from "react";

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.show !== this.props.show || nextProps.children !== this.props.children);
    }

    // componentDidUpdate() {
    //     console.log('[Modal has been updated]');
    // }

    render() {
        return (
            <div style={{
                zIndex: this.props.show ? '10' : '-10',
                opacity: this.props.show ? '1' : '0'
            }} className="fixed inset-0 overflow-y-auto transform-gpu transition-all duration-700 ease-in-out">
                <div className="flex min-h-full justify-center p-4 items-center">
                    <div className="overflow-hidden rounded-lg bg-white shadow-xl sm:w-full sm:max-w-lg">
                        <div className="p-4">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Modal;