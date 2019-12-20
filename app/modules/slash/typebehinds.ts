import { InputRule } from 'prosemirror-inputrules';
import { EditorState, Transaction } from 'prosemirror-state';

import { slashPopupPluginKey } from '@modules/slash/plugin';

export default () => new InputRule(/\/{1}$/, (state: EditorState, match: [string], start: number, end: number): Transaction => {
    console.log('inputrule:');
    let tr = state.tr.setMeta(slashPopupPluginKey, {
        start,
        end
    });
    return tr.insertText('/', start, end);
});