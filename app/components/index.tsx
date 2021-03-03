import React, { Component, ReactElement } from 'react';
import { connect, Provider } from 'react-redux';

import store from '@redux/store';
import { PopupStateType, StateType } from '@interfaces';

import {EditorContext} from './context';

class rootComponent extends Component {
    props: {
        popup: PopupStateType
    };
    render() {
        return this.props.popup.component || null;
    }
}

type AppState = {
    editor: any;
}

class App extends Component<{}, AppState> {
    constructor(options: any) {
        super(options);
        this.state = {
            editor: null,
        }
    }

    componentDidUpdate() {
        if (!this.state.editor) {
            this.setState({
                editor: window.NEDITOR.getEditor()
            });
        }
    }

    componentDidMount() {
        if (!this.state.editor) {
            this.setState({
                editor: window.NEDITOR.getEditor()
            });
        }
    }

    render() {
        const {editor} = this.state;
        const Com = connect((state: StateType) => {
            return {
                popup: state.popup
            }
        }, null)(rootComponent);
        return (
            <EditorContext.Provider value={editor}>
                <Com />
            </EditorContext.Provider>
        );
    }
}

export default () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}


