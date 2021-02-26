#!/usr/bin/env node

var fs = require('fs')
var path = require('path');

const isHeading = item => /#.*/.test(item)
const isEmptyLine = item => item == ""
const isSeperator = item => item == "---"

try {
  var dirPaths = process.argv.slice(2);
  for (dirPath of dirPaths ){
    console.log("Inside dir: ",dirPath )

    fs.readdir(dirPath, function(err, files){
      filesList = files.filter(function(e){
        return path.extname(e).toLowerCase() === '.md'
      });

      filesList.forEach(file => parseContents(path.join(dirPath,file)))
      console.log(filesList);
    });

  }

} catch(err){
  console.log("error:",err);
}

function parseContents(filePath){
  
  console.log("Reading file:",filePath )
  var data = fs.readFileSync(filePath,'utf8')
  var headings= []
  var content = []
  var section = []

  linesWithString= data.split('\n').map(
    (e) => {
      if ( !isEmptyLine(e) ){
        if ( isSeperator(e) )  {
          content.push({heading, section})
          section = []
          heading = ''
        }
        isHeading(e) ? heading = e : section.push(e)
      }
    }
  )
  //console.log(content)
}
