# layout-linter

## how to contribute
 
- run `git@github.com:peopledoc/layout-linter.git`
- go to `/layout-linter` and run `make install`

## how to demo
- run `git@github.com:peopledoc/layout-linter.git`
- go to `/layout-linter` and run `make install` and then run `make run-demo`
- an incognito window will open up in your Chrome browser with a linted page. All errors will be marked with a red dot on that page. Hover over each dot to read the list of errors for that element.

## how to use

- go to your app's folder and run `npm install layout-linter` **[NOT published on npm yet]**
- require the linting function anywhere your like by doing `const lintLayout = require('layout-linter');` 
- use the function as follows:

```
const lintLayout = require('layout-linter');

let lintedHTML = lintLayout({


  /*
    - optional
    - [String]
    - an absolute (or relative to the curret directory) path to a json file
      containing the linting rules
    - if omitted, the linter will look for a `.layoutrc` file anywhere inside
      your app's folder
  */
  
  layoutrc: '/some/custom/rules.config',



  /*
    - optional
    - refers to the CSS that will be used to style the linting errors that
      will appear in the linted HTML
    - [String]
    - an absolute (or relative to the curret directory) path to a .css file
    - will use the default CSS (provided by layout-linter internally) if omitted
    - can alse be set to false, in which case no CSS will be used
  */
  
  css: '/some/custom.css',



  /*
    - optional
    - [Boolean]
    - this function will always returns a complete HTML document, as a string,
      whether it is passed an HTML snippet or a complete HTML document
    - if this property is set to true, the function will return the linted HTML snippet
      (as a string) and not a complete HTML document containing that snippet
  */
  
  snippet: true,



  /*
    - mandatory
    - [String]
    - an absolute (or relative to the curret directory) path to the .html file you want to lint
    - OR a valid HTML string (e.g. "<div>....</div>" or "<html>....</html>" etc..) that you want to lint
  */
  
  source: './source.html'
  
  
});
```

## not yet
the layout-linter cannot be called via the CLI yet
