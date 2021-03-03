import React from 'react';
export const EditorContext = React.createContext(null);

export const withEditor = (Component: React.FC) => (props: any) => {
    return (
        <EditorContext.Consumer>
            {editor => {
                return <Component editor={editor} {...props} />;
            }}
        </EditorContext.Consumer>
    );
};
