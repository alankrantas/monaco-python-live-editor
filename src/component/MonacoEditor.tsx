import {
    FunctionComponent,
    useEffect,
    useState,
} from "react";
import Editor from "@monaco-editor/react";

import type { PyodideInterface } from "pyodide";
import { MonacoEditorProps, EditorOptions } from "./MonacoEditorOptions";
import { LoadPyodide, ExecuteCode } from "./MonacoEditorExecute";
import styles from "./MonacoEditor.module.css";

const MonacoEditor: FunctionComponent<MonacoEditorProps> = ({
    code = "",
    darkMode = false
}) => {
    const [pyodide, setPyodide] = useState<PyodideInterface | null>(null);
    const [editorCode, setEditorCode] = useState(code);
    const [executing, setExecuting] = useState(false);
    const [editorDarkMode, setEditorDarkMode] = useState(darkMode);
    const [consoleOutput, setConsoleOutput] = useState<string[]>([]);

    useEffect(() => {
        LoadPyodide().then((loaded) => setPyodide(loaded));
    });

    return (
        <div className={styles.container}>
            <div className={styles.grid}>
                <div className={styles.padded}>
                    <div className={styles.padded}>
                        <input
                            type="checkbox"
                            checked={editorDarkMode}
                            onChange={() => setEditorDarkMode(!editorDarkMode)}
                            className={styles.checkbox}
                        />
                        <span>&nbsp;Dark Mode</span>
                    </div>
                    <div className={styles.padded}>
                        <Editor
                            height="100vh"
                            theme={editorDarkMode ? "vs-dark" : "vs"}
                            options={EditorOptions}
                            language="python"
                            value={editorCode}
                            onChange={(value, e) => setEditorCode(value ?? "")}
                        />
                    </div>
                </div>
                <div className={styles.padded}>
                    <div className={styles.padded}>
                        <button
                            onClick={async (e) => {
                                navigator.clipboard.writeText(editorCode);
                                alert("Script copied!");
                            }}
                            className={styles.button}
                        >
                            Copy Code
                        </button>
                        &nbsp;
                        <button
                            onClick={async (e) => {
                                if (window.confirm("Confirm clearing script?"))
                                    setEditorCode("");
                            }}
                            className={styles.button}
                        >
                            Clear Code
                        </button>
                        &nbsp;
                        <button
                            onClick={async (e) => {
                                if (!pyodide || executing) return;
                                setExecuting(true);
                                setConsoleOutput([]);
                                setConsoleOutput(await ExecuteCode(pyodide, editorCode));
                                setExecuting(false);
                            }}
                            className={styles.button}
                            disabled={!pyodide || executing}
                        >
                            {
                                !pyodide ? "Loading..." : (executing ? "Executing..." : "Execute")
                            }
                        </button>
                    </div>
                    <pre className={styles.code}>
                        <div className={styles.padded}>
                            {
                                consoleOutput.join("\n")
                            }
                        </div>
                    </pre>
                </div>
            </div>
        </div>
    )
}


export default MonacoEditor;