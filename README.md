# Layout-Linter [![CircleCI](https://circleci.com/gh/peopledoc/layout-linter.svg?style=svg)](https://circleci.com/gh/peopledoc/layout-linter)

Create your own custom rules, using CSS selectors, to lint an HTML page and make sure it follows your HTML/CSS conventions (classes, attributes, tags, structure etc.)
### Screenshot Of A Linted Page

![demo screenshot](https://raw.githubusercontent.com/peopledoc/layout-linter/master/assets/demo.png)

## How To Use

### Install The Linter In Your App

go to your app's folder and run `npm i layout-linter`

### Set Up Your Linting Rules

- create a file containing your own custom linting rules as a json
- these linting rules are based on CSS selectors ([read more about them here](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)), and can be as simple as the name of a tag (e.g. `div`) or very elaborate.
- here is a guide on how to set up the contents of your json file:

```
{
  "rules": [{
    "selector": /*
                  a CSS selector indicating the element(s) that will be tested
                  as to whether they adhere to the rules below,

                  e.g. ".some-class"
                */

    "is": /*
            (rule)

            a tag name indicating what type the element must be,

            e.g. "img"
          */,

    "direct": /*
                (rule)

                an array of CSS selectors indicating direct children the element must contain,

                e.g. ["#id-x", ".class-b"]
              */,

    "contains": /*
                  (rule)

                  an array of CSS selectors indicating children (direct or indirect, it doesn't matter)
                  the element must contain,

                  e.g. ["#id-x", ".class-b"]
                */,

    "attrs": /*
              (rule)

              an array indicating attributes the element must have,

              e.g. ['attr-a', 'attr-b="xx"']
            */,

    "parent": /*
                (rule)

                a CSS selector indicating a direct parent that the linted element must have

                e.g. '.some-parent'
              */,

    "parents": /*
                (rule)

                an array of CSS selectors indicating a set of (direct or indirect) parents that the linted element must have

                e.g. ['.some-parent-a', '.some-parent-b']
              */,

     "siblings": /*
                (rule)

                an array of CSS selectors indicating a set of siblings that the linted element must have

                e.g. ['.some-sibling-a', '.some-sibling-b']
              */,

    "not": {

      /*
        any of the above rules (is, direct, contains, attrs, parent, parents, siblings), wrapped inside this `not`,
        indicating that these must NOT be true this time
      */

    }

  }, {

    "selector": "....",
    /* rule */,
    /* rule */,
    .....
    ..

  }]
}
```

- [click here for a real example of such a file](https://github.com/peopledoc/layout-linter/blob/master/demo/.layoutrc)
- name the file **`.layoutrc`** (**recommended**) or whatever you like

### Using The Linting Function

- require the linting function anywhere your like by doing `const lintLayout = require('layout-linter');`
- use the function as follows:

```
const lintLayout = require('layout-linter');

let result = lintLayout({


  /*
    - optional
    - [String]
    - an absolute (or relative to the curret directory) path to a json file
      containing the linting rules
    - if omitted, the linter will look for a `.layoutrc` file in your app's
      root folder only (it will not look for it in any of its subfolders)
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
    - mandatory
    - [String]
    - an absolute (or relative to the curret directory) path to the .html file you want to lint
    - OR a valid HTML string (e.g. "<div>....</div>" or "<html>....</html>" etc..) that you want to lint
  */

  source: './source.html',




  /*
    - optional
    - [Boolean]
    - the `html` key, of the object returned by this function, will always consist of a complete HTML document,
      as a string, whether the function is passed an HTML fragment or a complete HTML document
    - if the function is passed an HTML fragment and this property is set to true,
      the `html` key, of the object returned by this function, will consist of the linted HTML fragment (as a string)
      and not of a complete HTML document containing that fragment
    - if the function is passed a complete HTML document setting this property to true or false will have no effect
  */

  fragment: true


});
```

The function will return an object containing the following keys:

```
{
  html: /* the linted HTML as a string */,

  errors: /* the total number of errors found in HTML */,

  log: /*
        an array of objects, each object consisting of:
          - a string, indicating the problematic element
          - an array of error messages for that element

        e.g.  [{
                element: '<p class="this"></p>',
                errors: ['this element has this error', 'this element has this other error', ...]
              }, {
                element: '<div class="that"></div>',
                errors: ['that element has this error', 'that element has this other error', ...]
              }]
       */
}
```

## How To Contribute

- run `git clone git@github.com:peopledoc/layout-linter.git`
- go to `/layout-linter` and run `make install`
- read this [document on how to write tests](https://github.com/peopledoc/layout-linter/blob/master/testing.md)

## How To Demo

- close all current Chrome incognito windows
- go to `/layout-linter` and run `make run-demo`
- an incognito window will open up in your Chrome browser with an HTML page built using [Bootstrap](https://github.com/twbs/bootstrap). The page will have been linted using [the following set of rules](https://github.com/peopledoc/layout-linter/blob/master/demo/.layoutrc) (based on the [Bootstrap](https://github.com/twbs/bootstrap) framework HTML rules)

## How To Run Tests

run

```
make test
```

## License

This project is licensed under the [MIT License](LICENSE.md).
