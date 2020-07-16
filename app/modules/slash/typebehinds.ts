import { InputRule } from 'prosemirror-inputrules';
import { EditorState, Transaction } from 'prosemirror-state';

import { slashPopupPluginKey } from '@modules/slash/plugin';

export default () => new InputRule(/\/[a-z]*$/, (state: EditorState, match: [string], start: number, end: number): Transaction => {
    // 其实 inputrule 不是这么用的, 其作用是将一个输入转换成另一个输入
    // 此处的用法是检测到 / 输入就 setMeta 然后 rdxDispatch 一个 action
    let tr = state.tr.setMeta(slashPopupPluginKey, {
        start,
        end,
        text: match[0].substring(1)
    });
    if (end - start < 9) {
        return tr.replaceWith(start, end, state.schema.text(match[0]));
    }
    return null;
});