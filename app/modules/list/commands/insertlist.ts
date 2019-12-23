import { CommandArgType } from '@interfaces';
import { findWrapping, ReplaceAroundStep } from 'prosemirror-transform';
import { Fragment, Slice } from 'prosemirror-model';
import { insertlist } from '../../../commands';

export default ({ name = 'insertlist', value = '', view, options}: CommandArgType): void => {
    // TODO: insert a list, distinguish by options, the options has a type property which indicate the type of insert of the list, like order, unorder, todo, etc
    // the command be invoked only have one way(by now): by slash, so we should delete the range from slash to the last typed character before insert the list and then insert the list in the slash pos(the options.start pos)
    // remember we may should mapped the all content after the insert pos
    const {
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
    const { start, end } = options;
    const range = $from.blockRange($to);
    let wrap  = findWrapping(range, schema.nodes.ul);
    let content = Fragment.empty;
    for (let i = wrap.length - 1; i >= 0; i--) {
        content = Fragment.from(wrap[i].type.create(wrap[i].attrs, content));
    }
    tr.step(new ReplaceAroundStep(range.start, range.end, range.start, range.end, new Slice(content, 0, 0), wrap.length, true));
    dispatch(tr);
    /*
        1. deleted the range from start to end
        2. map the pos
        3. insert the list
    */
}