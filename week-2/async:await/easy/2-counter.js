




//using setTimeout in a function ----- its kinda recurssion
var count = 0
function infinity(){
    console.log(++count);
    setTimeout(infinity, 1000)
}

infinity()