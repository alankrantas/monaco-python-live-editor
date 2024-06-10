export interface MonacoEditorProps {
    code?: string;
    darkMode?: boolean;
    strictMode?: boolean;
}

export const EditorOptions = {
    automaticLayout: true,
    contextmenu: true,
    dragAndDrop: true,
    dropIntoEditor: {
        enabled: true,
    },
    detectIndentation: false,
    fixedOverflowWidgets: false,
    fontFamily: "Monaco",
    fontSize: 16,
    formatOnPaste: true,
    formatOnType: true,
    lineHeight: 1.5,
    minimap: {
        enabled: true,
    },
    padding: {
        top: 8,
        button: 8,
    },
    scrollbar: {
        verticalScrollbarSize: 9,
        horizontalScrollbarSize: 9,
        alwaysConsumeMouseWheel: false,
    },
    scrollBeyondLastLine: false,
    smoothScrolling: true,
    tabSize: 4,
    quickSuggestions: true,
    wordBasedSuggestions: true,
}