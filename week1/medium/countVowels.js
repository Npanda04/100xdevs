/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
    // Your code here

    let string = str.toLowerCase().toString()
    let voewl = new Set();
    let count = 0

    for(let i =0, j =i+1; i<string.length;i++){

      if(string[i] ==='a' || string[i] ==='e' ||string[i] ==='i' ||string[i] ==='o' ||string[i] ==='u'){
        count += 1;
      }

}

return count;

}

module.exports = countVowels;