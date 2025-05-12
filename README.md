# Monaco Python Live Editor

> Try it [here](https://alankrantas.github.io/monaco-python-live-editor/).

A simple demonstration to wrap [`@monaco-editor/react`](https://www.npmjs.com/package/@monaco-editor/react) combined with [`Pyodide`](https://pyodide.org/en/stable/index.html) to create a basic online Python editor component with a few additional packages supported. The React app is [created/built by Vite](https://vitejs.dev/) and deployed to GitHub Pages using Github Actions.

`preload_packages.jsonn` defines the Python packages that would be pre-loaded. Pyodide will also automatically install [supported external packages](https://pyodide.org/en/stable/usage/packages-in-pyodide.html) found in imports.

## Development

### `yarn`

Install dependencies.

### `yarn dev` or `yarn start`

Start the dev server.

### `yarn build`

Build a production at `./dist`.

### `yarn preview` or `yarn serve`

Serve and view the built production.

### `yarn commit`

Commit changes.
