import { EditorView } from 'prosemirror-view';
import { EditorState, Plugin } from 'prosemirror-state';
import { schemas } from '@schemas';
import { plugins } from '@plugins';
/*
    editor single intance
*/
export default class Editor {
    view: EditorView;
    constructor(options: any) {
        this.view = this.initView(options);
    }

    initView(options: any) {
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
        return new EditorView({ mount: document.getElementById(options.root) }, {
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
    }
}