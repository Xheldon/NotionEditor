import { Schema } from 'prosemirror-model';

import { doc, multiBlock, textBlock, text } from '@modules/base/schema';
import { p, intendBlock } from '@modules/paragraph/schema';
import { ul } from '@modules/list/schema';

export const schemas: Schema = new Schema({
    nodes: {
        doc,
        multiBlock,
        p,
        textBlock,
        intendBlock,
        text,
        ul
    },
    marks: {}
});

