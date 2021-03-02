import { Schema } from 'prosemirror-model';

import { doc, section, text } from '@modules/base/schema';
import { paragraph } from '@modules/paragraph/schema';
import { ul, ol, list_item } from '@modules/list/schema';
import { blockquote } from '@modules/blockquote/schema';
import { hard_break } from '@modules/hard-break/schema';
import { code_block } from '@modules/code-block/schema';
import { hr } from '@modules/hr/schema';
import { image } from '@modules/image/schema';


import { marks } from '@modules/marks/schema';

export const schemas: Schema = new Schema({
    nodes: {
        doc,
        text,
        paragraph,
        ul,
        ol,
        list_item,
        blockquote,
        hard_break,
        code_block,
        hr,
        image,
        section
    },
    marks: marks,
});

