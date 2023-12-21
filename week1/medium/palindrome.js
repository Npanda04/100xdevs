/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {


  let punctuation = /[\.,?!]/g

  str = str.split("").join("").toLowerCase().replace(punctuation, "").replace(/ /g, "")
  let reversed_str = str.split("").reverse().join("").toLowerCase().replace(punctuation, "").replace(/ /g, "")


  return str === reversed_str;
}

module.exports = isPalindrome;
