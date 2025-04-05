import {
    lazy,
    Suspense,
} from "react";

import "./App.css";

const MonacoEditor = lazy(
    () => import("./component/MonacoEditor"),
);

import exampleCode from "./data/exampleCode.txt?raw";

function App() {
    return (
        <div>
            <div>
                <h1>Monaco Python Live Editor</h1>
                <h3>In-browser execution for Python and machine learning packages (<a href="https://github.com/alankrantas/monaco-python-live-editor" target="_blank" rel="noreferrer noopener">repo</a>)</h3>
            </div>
            <div>
                <Suspense
                    fallback={
                        <h3>Loading editor...</h3>
                    }
                >
                    <MonacoEditor
                        code={exampleCode}
                        darkMode={true}
                    />
                </Suspense>
            </div>
        </div>
    )
}

export default App
