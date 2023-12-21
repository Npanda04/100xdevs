



//to check weather this is working or not try to remove everthing from myText2.txt file and if its already empty just run this code snippet.



const fs = require('fs'); 


const filePath = "/Users/deepanshu/Desktop/100xdev/week-2/easy/myText2.txt"
  
let data = "This is a added text we arrrrre going to write using fs.write"; 
  
fs.writeFile(filePath, data, (err) => { 
  if (err) 
    console.log(err); 
  else { 
    console.log("File written successfully\n"); 
  } 
}); 