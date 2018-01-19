# Layout linter

> lint your layout like you did your code

## Usage

1. Edit `.layoutrc` at the root of your project:

        {
          "target": ".my-element",
          "hasAttributes": [
            "class",
            "role"
          ]
        }

2. Add `layoutlint.js` to your page ;
3. **Reload**.

## Rules

* [x] `hasAttributes`: check all attributes are present in `target` ;

        hasAttributes: ['class', 'role']

* [ ] `requireChild`: require `target` to have a child of a given type.

        requireChild: 'h1'

### Install

    npm install debugger

### Test

    npm test

### Build

    npm build
