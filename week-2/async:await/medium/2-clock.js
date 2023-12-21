





// run this code snippet and a clock will start in your terminal.

function getTime(){
    let date = new Date()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    console.log(`${hours}:${minutes}:${seconds}`)
    
}

setInterval(getTime, 1000)