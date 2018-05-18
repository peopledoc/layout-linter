const path = require('path');
const fse = require('fs-extra');
const lintLayout = require('../../index');

let lintedHTML = lintLayout({
  /*
    - optional
    - absolute (or relative) path to json file containing rules
    - will look for .layoutrc file inside app directory (and all subdirectories) if omitted
  */
  //layoutrc: '/some/custom/rules.config',

  /*
    - optional
    - absolute (or relative) path to custom layout-linter .css file
    - can alse be set to false
    - will use default layout-linter .css if omitted, unless set to false
  */
  //css: '/some/custom.css',

  /*
    - optional
    - the module always returns a complete HTML document, whether it is passed a snippet or a complete HTML document
    - if this property is set to true, the module will return the linted snippet and not a complete HTML document
  */
  //snippet: true,

  /*
    - mandatory
    - absolute (or relative) path to .html file
    - or valid HTML string (e.g. "<div>....</div>" or "<html>....</html>" etc..)
  */
  source: path.join(__dirname, './source.html')
});

fse.writeFileSync('./index.html', lintedHTML);
