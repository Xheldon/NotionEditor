import { keymap } from 'prosemirror-keymap';
// import { baseKeymap } from 'prosemirror-commands';
import { Plugin } from 'prosemirror-state';

// common plugin
import { slashPopupPlugin } from '@modules/slash/plugin';

// typebehinds
import typebehinds from '@typebehinds';

// base keymap
import baseKeymap from './keymap';

// module plugin
import listPlugin from '@modules/list/plugin';

// debugger plugin
import debug from '@modules/debug/debug';

export const plugins: Plugin[] = [
    typebehinds(),
    // selectionPlugin(),
    listPlugin(),
    keymap(baseKeymap),
    slashPopupPlugin(),
    debug()
];