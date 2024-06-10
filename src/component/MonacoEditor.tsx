import {
    FunctionComponent,
    useRef,
    useState,
} from "react";
import Editor from "@monaco-editor/react";

import { MonacoEditorProps, EditorOptions } from "./MonacoEditorOptions";
import { ExecuteCode } from "./MonacoEditorExecute";
import styles from "./MonacoEditor.module.css";

const MonacoEditor: FunctionComponent<MonacoEditorProps> = ({
    code = "",
    darkMode = false
}) => {
    const monacoRef = useRef<any>(null);
    const [editorCode, setEditorCode] = useState(code);
    const [editorDarkMode, setEditorDarkMode] = useState(darkMode);
    const [consoleOutput, setConsoleOutput] = useState<string[]>([]);

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
                        <span>Dark Mode</span>
                    </div>
                    <div className={styles.padded}>
                        <Editor
                            height="100vh"
                            theme={editorDarkMode ? "vs-dark" : "vs"}
                            options={EditorOptions}
                            language="python"
                            value={editorCode}
                            onMount={(editor, monaco) => {
                                if (monaco) {
                                    monacoRef.current = monaco;
                                }
                            }}
                            onChange={(value, e) => {
                                setEditorCode(value ?? "");
                            }}
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
                            Copy
                        </button>
                        &nbsp;
                        <button
                            onClick={async (e) => {
                                if (window.confirm("Confirm clearing script?"))
                                    setEditorCode("");
                            }}
                            className={styles.button}
                        >
                            Clear
                        </button>
                        &nbsp;
                        <button
                            onClick={async (e) => setConsoleOutput(await ExecuteCode(editorCode))}
                            className={styles.button}
                        >
                            Execute
                        </button>
                    </div>
                    <div className={styles.padded}>
                        <pre className={styles.code}>
                            {
                                consoleOutput.join("\n")
                            }
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default MonacoEditor;