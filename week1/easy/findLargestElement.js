/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/


function findLargestElement(numbers) {
        //solution 1 

        let largestNumber = numbers[0];
        for(let i =0; i<numbers.length; i++){
            if(numbers[i] > largestNumber){
                largestNumber = numbers[i]
            }
        }
        return largestNumber;
    

        //solution 2
        if (numbers.length ===0 ){
            return undefined;
        }else{
            return Math.max(...numbers);

        }

        
}

module.exports = findLargestElement;