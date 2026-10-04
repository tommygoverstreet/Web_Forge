# WebForge

Visual HTML / CSS / JSON / JavaScript builder. No dependencies, no build step, no server.
Open `index.html` in a modern browser.

## File structure
- `index.html` : app shell (toolbar, three panes, dialogs); loads the scripts below in order
- `css/webforge.css` : theme variables (light/dark), layout, mobile layout
- `js/definitions.js` : element definitions (`DEFS`), events, actions, starter templates
- `js/state.js` : state object, history (undo/redo), helpers
- `js/generator.js` : HTML, CSS, JSON and JavaScript generators
- `js/validator.js` : validation and accessibility checks
- `js/renderer.js` : tree, preview, problems list, editor tabs
- `js/builder.js` : edit actions, save/open/import/export
- `js/events.js` : toolbar and tree event wiring
- `js/css-builder.js`, `js/component-builder.js`, `js/docs.js`, `js/ui.js` : style helper, components, docs, search and dialogs
- `js/json-builder.js`, `js/js-builder.js` : JSON tree editor, JavaScript builder
- `js/templates.js` : extra starter templates
- `js/importer.js` : Beginner/Intermediate/Advanced modes, paste-HTML import
- `js/editor.js` : syntax highlighting, line numbers, copy and download in the Code tab
- `js/a11y.js` : nesting, contrast and keyboard-access checks
- `js/dnd.js` : drag and drop in the tree
- `js/definitions-io.js` : load/export definition JSON (see `data/`)
- `js/app.js` : start-up

The scripts are plain (not ES modules) so the app works from `file://`. They share one global scope, so keep the load order in `index.html`.

## How state works
One object `S` holds everything: `tree` (elements), `css` (rules), `json` (text), `events`, `js` (your script).
Every change calls `mut()`, which saves a snapshot for undo, applies the change, then refreshes the tree,
problems list and (debounced) preview. Undo and redo restore snapshots; nothing reverses DOM edits by hand.
The preview is a sandboxed iframe (`sandbox="allow-scripts"`) loaded from `srcdoc`, so generated code never runs in the builder.

## Definitions
- **HTML elements:** the `DEFS` object. Each entry has `cat`, optional `text` (default text), `void`, and `fields`.
- **JavaScript constructs:** the `JSC` array. Each has `f` (fields) and `t` (a template with `{field}` placeholders).
- **Components:** the `CMPS` object. Each returns `{nodes, css}`.
- **Templates:** the `TEMPLATES` object. Each returns a full state.
- **Style helper:** the `VF` array of `[css property, label, placeholder or options]`.

## Add an element
Add an entry to `DEFS`, e.g. `"figure":{"cat":"Media"}`. It appears in the Add list, search, and docs.
Give it `fields` for extra attributes and add a sentence to `DOCS`.

## Add a CSS property
Add `['letter-spacing','Letter spacing','0.05em']` to `VF`. Use an array of strings as the third item for a dropdown, or `'color'` for a picker.

## Add a JavaScript construct
Add an object to `JSC`: `{k:'key',l:'Label',f:[['name','Label','default']],t:'code with {name}'}`.

## Create a template or component
Copy `TEMPLATES.hello` or `CMPS.Card`. Build elements with `n(tag,{text,attrs,children})`.
Users can also save any selected element as a custom component. These are kept in the browser (localStorage key `webforge:components`).

## Saving and exporting
Save and Open use localStorage (`webforge:project`). Import reads a `.webforge.json` file.
Export downloads `index.html`, `style.css`, `script.js`, `data.json` and the project file.
Place `style.css` in `css/` and `script.js` in `js/` to match the links in `index.html`.
The exported code has no WebForge dependency.
