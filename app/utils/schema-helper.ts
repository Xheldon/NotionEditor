export const hasType = (dom: HTMLElement, type: string) => {
    return !!dom.dataset[type];
};

export const defaultParseDom = (type: string) => {
    return {
        tag: 'div',
        getAttrs(dom: HTMLElement) {
            if (hasType(dom, type)) {
                return {};
            }
        }
    };
}

export const defaultSchemaAttrs = (type: string) => {
    return {
        class: {
            default: `n-${type}`,
        },
        'data-type': {
            default: type,
        },
        style: {
            default: ''
        }
    }
}