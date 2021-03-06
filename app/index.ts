
import { EditorView } from 'prosemirror-view';

import { render } from 'react-dom';
import { Provider } from 'react-redux';
import ReactRootApp from '@components/index';
import Editor from './editor';

// import 'prosemirror-view/dist/style/prosemirror.css';
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

    getEditor() {
        return this.editor;
    }
}

window.NEDITOR = new NotionEditor({
    title: 'NotionEditor',
    root: 'n-editor'
    // other config
})
// react view
render(ReactRootApp(), document.getElementById('n-component'));
