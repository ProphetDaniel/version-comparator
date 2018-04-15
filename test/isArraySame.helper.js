function isArraySame (array1, array2){
  let isSame = (array1.length == array2.length) && array1.every(function(element, index) {
    return element === array2[index];
  });
  return isSame
}

export {isArraySame}