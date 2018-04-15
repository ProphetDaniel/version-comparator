import compare from '../version-compare.js'
import { isArraySame } from './isArraySame.helper'
import {readFileStream} from './readFileStream.helper'
import {writeFileStream} from './writeFileStream.helper'

function testOne(){
  function checkExpected (versionA, versionB, expectedResult) {
    function fromNumberToString(number){
      if (number === 1)
        return "greater"
      if (number === -1)
        return "lower"
      return "equal"
    }
    let wasExpectationFullfiled = fromNumberToString(compare(versionA, versionB)) === expectedResult
    console.assert(wasExpectationFullfiled, 'Version ' + versionA + ' should be ' + expectedResult + ((expectedResult === "equal") ? ' to ' : ' than ') + versionB)
    if (wasExpectationFullfiled) { return '\u2713' }
  }

  let testMatrix = [
    ['Test number with letter', '1.10a', '1.10', 'greater'],
    ['Test equal versions', '0.4.1', '0.4.1', 'equal'],
    ['Test lower version', '0.4.2', '0.4.22', 'lower']
  ]

  testMatrix.forEach(line => console.log(line[0], checkExpected(line[1], line[2], line[3])))
}

testOne()

async function testTwo(){
  let unsortedReadList = await readFileStream("./test/pseudoOrderedList.csv")
  let sortedReadList = await readFileStream("./test/orderedList.csv")
  let sortedList = unsortedReadList.sort((a,b) => compare(processLongVersion(a), processLongVersion(b)))

  console.assert(isArraySame(sortedList, sortedReadList), "Sorted list didn't match correct ordering!")

  // writeFileStream("./test/orderedList.csv", sortedList)
}
testTwo()

function processLongVersion(longVersionString){
  let cut = longVersionString.substring(0,longVersionString.indexOf("+"))
  let replacedNightly = cut.replace('-nightly', '')
  return replacedNightly
}