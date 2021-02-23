#!/usr/bin/env node

var fs = require('fs')

const isHeading = item => /#.*/.test(item)
const isEmptyLine = item => item == ""
const isSeperator = item => item == "---"

try {
  var data = fs.readFileSync('./opschautari/pre-requisite.md','utf8')
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
  console.log(content)
} catch(err){
  console.log("error:",err);
}
