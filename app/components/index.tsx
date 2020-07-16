import React, { Component, Fragment } from 'react';
import { connect, Provider } from 'react-redux';

import store from '@redux/store';
import { PopupStateType, StateType } from '@interfaces';
import SlashPopupContainer from '@components/slash/slash-container';

/**
 * 这里仿照 VOP - 1 实现 component 系统
 */

// components 的 key 与 redux 的 state 的 key 一一对应
const components: {
    [name: string]: any
} = {
    popup: SlashPopupContainer
};

class rootComponent extends Component {
    props: {
        [P in keyof typeof components]: any
    };
    static propTypes = {};
    render() {
        const stateComponent = Object.keys(components)
            .map(key => {
                const state = this.props[key];
                const StateComponent = components[key];
                return state && StateComponent && <StateComponent key={key} {...state} />;
            })
            .filter(Boolean);
        return (
            <Fragment>
                {stateComponent}
            </Fragment>
        )
    }
}

const mapStateToProps = (state: StateType) => {
    return state;
};

const mapDispatchToProps = {};

const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(rootComponent);


export default () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}


