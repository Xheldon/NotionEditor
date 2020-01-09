import { Schema } from 'prosemirror-model';

import { doc, section, textBlock, text } from '@modules/base/schema';
import { p } from '@modules/paragraph/schema';
import { ul } from '@modules/list/schema';

export const schemas: Schema = new Schema({
    nodes: {
        doc,
        text,
        textBlock,
        p,
        ul,
        section
    },
    marks: {}
});

