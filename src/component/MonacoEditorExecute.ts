import { loadPyodide } from "pyodide";

let pyodide: any = null;

let consoleOutput: string[] = [];
const stdout = (msg: any) => consoleOutput.push(msg);

export const InitializePyodide = async () => {
    if (pyodide) return;


};

export const ExecuteCode = async (code: string): Promise<string[]> => {
    consoleOutput = [];

    if (!pyodide) {
        pyodide = await loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/",
            stdout: stdout,
            stderr: stdout,
            packages: [
                "numpy",
                "pandas",
                "scikit-learn"
            ]
        });
    }

    try {
        await pyodide?.runPythonAsync(code);
    } catch (e: any) {
        stdout(e.stack);
    } finally {
        stdout(`[editor: last executed at ${new Date().toLocaleString("en-us")}]`);
    }

    return consoleOutput;
};