/**
 * 这个文件是为了 debugger 目的, 进行 log 等操作
 */

import { Plugin } from 'prosemirror-state';

export default (): Plugin =>
    new Plugin({
        props: {
            handleDoubleClick(view, pos, e): boolean {
                console.log('pos:', pos, view.state.selection.from);
                return false;
            }
        }
    });