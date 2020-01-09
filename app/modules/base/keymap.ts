import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";

export default {
    Enter: (state: EditorState, dispath: Function, view: EditorView) => {
        const selection = state.selection;
        if (selection.$cursor) { // 光标

        } else { // 选区内容

        }
        return true;
    }
}