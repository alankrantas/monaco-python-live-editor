import { loadPyodide, type PyodideInterface } from "pyodide";
import pyodideSettings from "../data/pyodide-settings.json";

let consoleOutput: string[] = [];

const stdout = (msg: any) => {
    consoleOutput.push(msg);
    console.log(msg);
};

export const LoadPyodide = async (): Promise<PyodideInterface> => {
    return loadPyodide({
        indexURL: `https://cdn.jsdelivr.net/pyodide/v${pyodideSettings.version}/full/`,
        stdout: stdout,
        stderr: stdout,
        packages : pyodideSettings.preload_packages,
        checkAPIVersion: true,
    });
};

export const ExecuteCode = async (pyodide: PyodideInterface, code: string): Promise<string[]> => {
    consoleOutput = [];

    try {
        const dict = pyodide.globals.get('dict');
        const globals = dict();

        await pyodide.loadPackagesFromImports(code);
        await pyodide.runPythonAsync(code, { globals, locals: globals });

        globals.destroy();
        dict.destroy();
    } catch (e: any) {
        stdout(e.stack);
    } finally {
        stdout(`\n[editor (Pyodide: v${pyodide.version}): ${new Date().toLocaleString("en-us")}]`);
    }

    return consoleOutput;
};
