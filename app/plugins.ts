import { keymap } from 'prosemirror-keymap';
import { baseKeymap } from 'prosemirror-commands';
import { Plugin } from 'prosemirror-state';

// common plugin
import { slashPopupPlugin } from '@modules/slash/plugin';

// typebehinds
import typebehinds from '@typebehinds';


export const plugins: Plugin[] = [
    typebehinds(),
    keymap(baseKeymap),
    slashPopupPlugin()
];