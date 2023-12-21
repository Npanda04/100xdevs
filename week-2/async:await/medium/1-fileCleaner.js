


//if you want to check this function just try to make some random spaces in myText.txt file and if the condition is already there then just try to run this.

const fs = require("fs")

const filePath = "/Users/deepanshu/Desktop/100xdev/week-2/medium/myText.txt"

fs.readFile(filePath, 'utf8', (err, data) =>{
    console.log(`this is the text before edit : ${data}`)

    data = data.replace(/\s+/g, " ")
    fs.writeFile(filePath, data, (err) => { 
        if (err) 
            console.log(err); 
        else { 
            console.log(`edited text : ${data}`); 
        } 
});  
})