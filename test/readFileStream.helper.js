import csv from 'fast-csv'
var fs = require('fs');

async function readFileStream(path){
  let listOfData = []
  var stream = fs.createReadStream(path)
    .pipe(csv())

  var end = new Promise(function(resolve, reject) {
    stream.on('end', ()=>resolve(listOfData));
    stream.on('error', reject); // or something like that
    stream.on('data', function(data){
      listOfData.push(data.toString())
    }); // or something like that
  });

  return await end;
}

export {readFileStream}