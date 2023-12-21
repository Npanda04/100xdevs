




// this is a simple function which reads text from a file and its a async function so if yoy give it a expensive operation 
//then it will print the files data later when the operations finishes. to test this try to play with the zeros in the for loop.
const fs = require("fs")

const filePath = "/Users/deepanshu/Desktop/100xdev/week-2/easy/myText.txt"

fs.readFile(filePath, 'utf8', (err, data) =>{
    console.log(data)
})

var sum = 0
for(let i =0; i<1000000; i++){
    sum += i;
}
console.log(sum)