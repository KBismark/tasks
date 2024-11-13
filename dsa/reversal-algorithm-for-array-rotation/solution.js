
const reversalAlg = (arr, divPosition) =>{
  // splits the array
  let reversedFirstBlock = [];
  let reversedSecondBlock = [];
  for(let i = divPosition; i >=0; i-- ){
    reversedFirstBlock.push(arr[i]);
  }
  for(let i = arr.length-1; i > divPosition; i-- ){
    reversedSecondBlock.push(arr[i]);
  }
  let joinedReversedArr = reversedFirstBlock.concat(reversedSecondBlock);
  let rotatedArr = []
  for(let i = joinedReversedArr.length - 1; i >=0; i-- ){
    rotatedArr.push(joinedReversedArr[i]);
  }
  return rotatedArr;
}

// Third approach to rotate array algorithm
const reversalAlg2 = (arr, divPosition) =>{
  let firstBlock = arr.slice(0,divPosition).reverse();
  let secondBlock = arr.slice(divPosition).reverse();
  let rotatedArr = firstBlock.concat(secondBlock).reverse();
  return rotatedArr
};

let newArr = [1,2,3,4,5,6,7];
// console.log(reversalAlg2(newArr, 3));
// console.log(reversalAlg3(newArr, 2));