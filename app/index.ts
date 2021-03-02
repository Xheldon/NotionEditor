
import { EditorView } from 'prosemirror-view';

import { render } from 'react-dom';
import { Provider } from 'react-redux';
import ReactRootApp from '@components/index';
import Editor from './editor';

import './style.scss';

declare global {
    interface Window {
        NEDITOR: any
    }
}
interface NotionEditorInterface {
    editor: any;
}
class NotionEditor implements NotionEditorInterface {
    editor: any;
    constructor(options = {}) {
        this.editor = null;
        this.active(options);
    }

    active(options: any) {
        this.editor = new Editor(options);
    }
}

// Note: This should init by Client, we mock it.
document.addEventListener('DOMContentLoaded', () => window.NEDITOR = new NotionEditor({
    title: 'NotionEditor',
    root: 'n-editor'
    // other config
}));
// react view
render(ReactRootApp(), document.getElementById('n-component'));
