import { loadPyodide } from "pyodide";
import pyodideSettings from "../data/pyodide-settings.json";

let consoleOutput: string[] = [];
const stdout = (msg: any) => consoleOutput.push(msg);

export const LoadPyodide = async (): Promise<any> => {
    return await loadPyodide({
        indexURL: pyodideSettings.url,
        stdout: stdout,
        stderr: stdout,
        packages: pyodideSettings.packages
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
