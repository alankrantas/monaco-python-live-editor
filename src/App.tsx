import {
    lazy,
    Suspense,
    useEffect,
    useState
} from "react";

import "./App.css";

const MonacoEditor = lazy(
    () => import("./component/MonacoEditor"),
);

function App() {
    const [editorCode, setEditorCode] = useState(`print("Hello World!")`);

    useEffect(() => {
        fetch("/monaco-python-live-editor/exampleCode.txt").then(res => res.text()).then(data => setEditorCode(data));
    }, []);

    return (
        <div>
            <div>
                <h1>Monaco Python Live Editor (<a href="https://github.com/alankrantas/monaco-python-live-editor" target="_blank">Github Repo</a>)</h1>
            </div>
            <div>
                <Suspense
                    fallback={
                        <h4>Loading editor component...</h4>
                    }
                >
                    <MonacoEditor
                        code={editorCode}
                        darkMode={true}
                    />
                </Suspense>
            </div>
        </div>
    )
}

export default App
