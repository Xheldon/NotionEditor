/*
* There have two sub type that we know to implement this class:
*   1. plugin.view(view: EditorView) => { update(view: EditorView, prevState: EditorState), destroy() }
*   2. plugin.props.nodeViews: { node(node: Node, view: EditorView, getPos: () => number, decorations: [Decoration]) => { update(node: Node, decorations: [Decoration]), destroy() } }
* */
export abstract class ReactView<T, D> {
    abstract update(first: T, second: D): void; // above the two type's update function are both have two parameters
    destroy() {
        console.log('doing noting when destroy');
    }
}
