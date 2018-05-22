const fs = require('fs');

module.exports = function(filename, options) {
  let find = function(dir) {
    let results = [];
    let list = fs.readdirSync(dir);
    list.forEach((file)=> {
      let pathToFile = `${dir}/${file}`;
      let stat = fs.statSync(pathToFile);
      if (stat && stat.isDirectory()) {
        let rgxForIgnoredDir = new RegExp(`${options.ignore}$`);
        if (!rgxForIgnoredDir.test(pathToFile)) {
          results = results.concat(find(pathToFile));
        }
      } else {
        let escapedFilename = filename.replace(/\./g, '\\.');
        let rgxForSearchedFilename = new RegExp(`\/${escapedFilename}$`);
        if (rgxForSearchedFilename.test(pathToFile)) {
          results.push(pathToFile);
        }
      }
    });
    return results;
  };
  return find(options.inside);
};
