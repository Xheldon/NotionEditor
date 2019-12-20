import { inputRules, emDash } from 'prosemirror-inputrules';
import { Plugin } from 'prosemirror-state';

/*
import listTypebehinds from '@modules/list/typebehind';
*/
import slashTypebehind from '@modules/slash/typebehinds';

export default (): Plugin => inputRules({
    rules: [
        slashTypebehind()
    ].concat(emDash)
})