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
                <h1>Monaco Python Live Editor (<a href="https://github.com/alankrantas/monaco-python-live-editor" target="_blank">Github Repo</a>)</h1>
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
