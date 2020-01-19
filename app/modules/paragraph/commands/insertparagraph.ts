import { TextSelection } from 'prosemirror-state';

import { CommandArgType } from "@interfaces";
import { isInCodeBlock, isInList } from '@utils/module-location';

export default ({ name = 'insertparagraph', view, options }: CommandArgType): void => {
    const {
        state,
        state: {
            schema,
            selection: {
                $from,
                $to
            },
            tr,
        },
        dispatch
    } = view;
    const _nodes = state.schema.nodes;
    // 获取到当前文本块节点的父级的后面位置
    // TODO: 未考虑复杂情况, 如在 table 内部的时候
    const insertPos = $from.after(-1);
    const { inputStart, inputEnd } = options;
    // 删除 start 到 end 输入的内容从而确认 enter 操作
    tr.delete(inputStart, inputEnd);
    // 构建一个空的 paragraph
    let insertNode = _nodes.p.create(null, _nodes.textBlock.create(null, _nodes.text.create(null, '')));
    let mappedPos = tr.mapping.map(insertPos);
    // 插入 mapping 后的位置
    tr.insert(mappedPos, insertNode);
    // 此时已经插入成功, 但是光标还在上面, 因此移动这个光标(新建一个 TextSelection 即可)
    tr.setSelection(TextSelection.create(tr.doc, mappedPos + 2));
    dispatch(tr.scrollIntoView());
}
