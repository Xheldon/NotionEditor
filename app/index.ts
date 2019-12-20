import { EditorState, Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import {Fragment, Slice} from 'prosemirror-model';
import {findWrapping, ReplaceAroundStep} from 'prosemirror-transform';

import { render } from 'react-dom';
import { Provider } from 'react-redux';
import ReactRootApp from '@components/index';


import { schemas } from '@schemas';
import { plugins } from '@plugins';

import './style.scss';

declare global {
    interface Window {
        d(): void,
        v: EditorView
    }
}

const root = document.getElementById('n-editor');

const state = EditorState.create({
    schema: schemas,
    plugins: plugins.concat(new Plugin({
            props: {
                handleClick(view: EditorView, pos: number): boolean {
                    return false;
                }
            }
        }))
});

const view = new EditorView({ mount: root }, {
    state,
    editable(view): boolean {
        // Note: At the beginning, i want to design the structure like notion, such as not make the whole document contenteditable make the atom block instead to
        // but there is a problem which make the plugin view not update, so i have to return it back, sad.
        return true;
    },
    attributes(state) {
        return {
            style: 'box-sizing: border-box;'
        }
    }
});

// react view
render(ReactRootApp(), document.getElementById('n-component'));
