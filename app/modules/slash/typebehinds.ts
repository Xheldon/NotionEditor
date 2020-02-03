import { InputRule } from 'prosemirror-inputrules';
import { EditorState, Transaction } from 'prosemirror-state';

import { slashPopupPluginKey } from '@modules/slash/plugin';

export default () => new InputRule(/\/{1}$/, (state: EditorState, match: [string], start: number, end: number): Transaction => {
    // 其实 inputrule 不是这么用的, 其作用是将一个输入转换成另一个输入
    // 此处的用法是检测到 / 输入就 setMeta 然后 rdxDispatch 一个 action
    let tr = state.tr.setMeta(slashPopupPluginKey, {
        start,
        end
    });
    return tr.insertText('/', start, end);
});