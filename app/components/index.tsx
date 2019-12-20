import React, { Component, ReactElement } from 'react';
import { connect, Provider } from 'react-redux';

import store from '@redux/store';
import { PopupStateType, StateType } from '@interfaces';

class rootComponent extends Component {
    props: {
        popup: PopupStateType
    };
    render() {
        return this.props.popup.component;
    }
}

const App = connect(
    (state: StateType) => {
        return {
            popup: state.popup
        }
}, null)(rootComponent);


export default () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}


