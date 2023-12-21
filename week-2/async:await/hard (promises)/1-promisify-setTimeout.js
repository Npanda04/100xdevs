/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/



function wait(n) {
    let time = n*1000

    // return new Promise((resolve) =>{
    //     setTimeout(() =>{
    //         resolve()
    //     }, time)
    // })

    // a little cleaner syntex does the same thing as above code.
    return new Promise(resolve =>setTimeout(resolve,time))

}


module.exports = wait;
