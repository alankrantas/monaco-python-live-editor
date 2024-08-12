import { loadPyodide } from "pyodide";

let consoleOutput: string[] = [];
const stdout = (msg: any) => consoleOutput.push(msg);

export const LoadPyodide = async (): Promise<any> => {
    return await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/",
        stdout: stdout,
        stderr: stdout,
        packages: [
            "numpy",
            "pandas",
            "scikit-learn",
        ]
    });
};

export const ExecuteCode = async (pyodide: any, code: string): Promise<string[]> => {
    consoleOutput = [];

    try {
        if (pyodide) await pyodide.runPythonAsync(code);
    } catch (e: any) {
        stdout(e.stack);
    } finally {
        stdout(`[editor: last executed at ${new Date().toLocaleString("en-us")}]`);
    }

    return consoleOutput;
};
