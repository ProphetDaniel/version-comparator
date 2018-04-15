import csv from 'fast-csv'
var fs = require('fs');

function writeFileStream(path, list){
  var fast_csv = csv.createWriteStream()
  var writeStream = fs.createWriteStream(path);
  fast_csv.pipe(writeStream);

  for(var i = 0; i < list.length; i++){
    fast_csv.write( [ list[i]  ] )             //each element inside bracket
  }
  fast_csv.end()
}

export {writeFileStream}