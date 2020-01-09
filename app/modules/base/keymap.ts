import { EditorState, TextSelection, NodeSelection } from "prosemirror-state";
import { EditorView } from "prosemirror-view";

// keymap 按照引用顺序, 先调用的先执行, 返回 true 剩余的就不会再执行, 因此 basemap 是最后被引入的

export default {
    Enter: (state: EditorState, dispath: Function, view: EditorView) => {
        const selection = state.selection;
        if ((<TextSelection>selection).$cursor) { // 光标
            // 如果是在
            // 将光标之后的内容作为新的 p 标签的内容
        } else {
            if (selection instanceof TextSelection) { // 选区中有内容

            } else { // 此时应该是 AllSelection 类型或者 NodeSelection 的选区, 不管它, 直接将光标放到第一个 block 的文本结尾处

            }
        }
        return true;
    }
}