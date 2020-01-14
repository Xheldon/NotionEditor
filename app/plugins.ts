import { keymap } from 'prosemirror-keymap';
// import { baseKeymap } from 'prosemirror-commands';
import { Plugin } from 'prosemirror-state';

// common plugin
import { slashPopupPlugin } from '@modules/slash/plugin';

// typebehinds
import typebehinds from '@typebehinds';

// base keymap
import baseKeymap from '@modules/base/keymap';

// module plugin
import listPlugin from '@modules/list/plugin';

export const plugins: Plugin[] = [
    typebehinds(),
    // selectionPlugin(),
    listPlugin(),
    keymap(baseKeymap),
    slashPopupPlugin()
];