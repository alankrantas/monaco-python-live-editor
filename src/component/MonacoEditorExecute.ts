import { loadPyodide, type PyodideInterface } from "pyodide";
import preload_python_packages from "../data/preload_packages.json";

let consoleOutput: string[] = [];

const stdout = (msg: any) => {
    consoleOutput.push(msg);
    console.log(msg);
};

export const LoadPyodide = async (): Promise<PyodideInterface> => {
    let pyodide_version = "0.0.0";

    if (import.meta.env.DEV) {
        pyodide_version = (await import('../../package.json')).dependencies.pyodide;
    } else {
        pyodide_version = (await import('../data/pyodide_version.json')).version;
    }
    pyodide_version = pyodide_version.replaceAll('^', '').replaceAll('~', '');

    console.log(`Found Pyodide version: ${pyodide_version}`);

    return loadPyodide({
        indexURL: `https://cdn.jsdelivr.net/pyodide/v${pyodide_version}/full/`,
        stdout: stdout,
        stderr: stdout,
        packages: preload_python_packages,
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
