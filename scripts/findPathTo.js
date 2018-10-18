const fs = require('fs');

module.exports = function(filename, options) {
  let find = function(dir) {
    let results = [];
    let list = fs.readdirSync(dir);
    list.forEach((file)=> {
      let pathToFile = `${dir}/${file}`;
      let stat;

      try {
        stat = fs.statSync(pathToFile);
      } catch(err) {
        // for errors like ENAMETOOLONG
      }

      if (stat && stat.isDirectory() && (options.ignore.indexOf('*') === -1)) {
        let mustIgnore = options.ignore.some((dirToIgnore)=> {
          let rgxForDirToIgnore = new RegExp(`${dirToIgnore}$`);
          return rgxForDirToIgnore.test(pathToFile);
        });
        if (!mustIgnore) {
          results = results.concat(find(pathToFile));
        }
      } else {
        let escapedFilename = filename.replace(/\./g, '\\.');
        let rgxForSearchedFilename = new RegExp(`/${escapedFilename}$`);
        if (rgxForSearchedFilename.test(pathToFile)) {
          results.push(pathToFile);
        }
      }
    });
    return results;
  };
  return find(options.inside);
};
