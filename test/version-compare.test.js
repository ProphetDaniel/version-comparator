import * as version from '../version-compare.js'
require('babel-register')

function checkExpected (versionA, versionB, expectedResult) {
  let wasExpectationFullfiled = version.compare(versionA, versionB) === expectedResult
  console.assert(wasExpectationFullfiled, 'Version ' + versionA + ' should be ' + expectedResult + ((expectedResult === 'equal') ? ' to ' : ' than ') + versionB)
  if (wasExpectationFullfiled) { return '\u2713' }
}

let testMatrix = [
  ['Test number with letter', '1.10a', '1.10', 'greater'],
  ['Test equal versions', '0.4.1', '0.4.1', 'equal'],
  ['Test lower version', '0.4.2', '0.4.22', 'lower']
]

testMatrix.forEach(line => console.log(line[0], checkExpected(line[1], line[2], line[3])))
console.log('\nSuccessfully passsed all tests!')
