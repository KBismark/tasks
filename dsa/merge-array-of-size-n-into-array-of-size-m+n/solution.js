
/**
 * Suppose the size of ‘ARR1’ is ‘M’ and the size of ‘ARR2’ is ‘N’.
 *  1. create an array, ‘ARR3’ of size ‘M + N’.
 *  2. Copy the elements from ‘ARR1’ to ‘ARR3’.
 *  3. Copy the elements from ‘ARR2’ to ‘ARR3’.
 *  4. Sort the array, ‘ARR3’.
 *  5. Copy the first ‘M’ elements from ‘ARR3’ to ‘ARR1’ 
 *  6. copy the remaining ‘N’ elements from ‘ARR3’ to ‘ARR2’.
 *  7. Return ARR1 and ARR2
 */

const mergeTwoNumArrays = (arr1, arr2) => {
    let thirdArray = [];
    for(let i = 0; i < arr1.length; i++) {
      thirdArray.push(arr1[i]);
    }
    for(let i = 0; i < arr2.length; i++) {
      thirdArray.push(arr2[i]);
    }
    
    ascendSort(thirdArray); // sort array 3
  
    let y = 0;
    for(let m = 0; m < thirdArray.length; m++) {
      if(m<arr1.length){ // 5
        arr1[m] = thirdArray[m]; 
      }else{
        arr2[y] = thirdArray[m]; 
        y++;
      }
    }

    return [arr1, arr2]
  }
  
  function ascendSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap arr[j] and arr[j + 1]
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
  }
  
  let firstArray = [1, 5, 7, 19, 34]
  let secondArray = [2, 4, 8, 8, 12, 17, 19]

  console.log(mergeTwoNumArrays(firstArray, secondArray));
  ;
  