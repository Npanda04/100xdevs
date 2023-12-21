/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {

  let n1 = str1.length
  let n2 = str2.length

  if(n1 != n2){
    return false;
  }

  sorteds1 = str1.toLowerCase().split('').sort().join('');
  sorteds2 = str2.toLowerCase().split('').sort().join('');

  //solution 1 

  // for(let i =0; i<sorteds1.length; i++){
  //   if(sorteds1[i] != sorteds2[i]){
  //     return false;
  //   }
  // }
  // return true;



  
  // solution 2
  return sorteds1 === sorteds2;

  }


module.exports = isAnagram;
