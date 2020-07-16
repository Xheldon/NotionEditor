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
        // Note: 一开始的时候我打算将编辑器做成跟 Notion 一样, 每个 block 有 contenteditable 属性, 而不是只在根节点有一个 contenteditable 属性
        //  但是发现如此实现的话插件的 view 无法正常更新, 因此放弃, sad
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
