const fse = require('fs-extra');
const lintLayout = require('../layout-linter');

let lintedHTML = lintLayout({

  /*
    - optional
    - will look for ./.layoutrc globally if omitted
  */

  //rulesFile: '/some/custom/json/location',



  /*
    - optional
    - will use default layout-linter css if omitted
  */

  //cssFile: '/some/custom/css,




  /*
    - mandatory
    - also accepts HTML string directly
  */

  source: './source.html'
});

fse.writeFileSync('./index.html', lintedHTML);
