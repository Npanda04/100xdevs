//this code snippet is use to explain the natures of .then() and await.

// step -1 we have created a simple promise which resolves after 2 seconds----[feel free to change the time in setTimeOut]

//step -2 we create a function 1 using .then(), which will do some task. task are in such a way that my promise call is sandwiched in b/w tasks.
// i have tried to console log the statments.

//step - 3 i have cretaed the same function with function 2 name but using async await. promise call is also sandwiched b/w tasks.

//step -4 after all these functions there is a main thread which will execute.

//  JUST RUN THIS FILE AND SEE THE OUTPUTS OF BOTH THE FUNCTIONS AND TRY TO READ THROUGH IT.  HOPEFULLY YOU'LL UNDERSTAND.

const myP = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("the promise is resolved");
  }, 2000);
});

// function 1

function get_data() {
  console.log("we are doing some task before the promise call");

  //this is my promise call

  myP.then((res) => {
    console.log(res);

    //these task will perform after my promise is resolved or rejected

    console.log("this is in the dot then");
    console.log("we'll do task on the api data");
  });

  //this is an independent task and will execute after the "we are doing some task before the promise call"

  console.log("this is outside the .then() ");
}

// function 2

// async function get_data() {
//   try {
//     console.log("we are doing some task before the API call");

//     // //this is my promise call
//     const res = await myP;

//     ////these task will perform after my promise is resolved or rejected

//     console.log(res);
//     console.log("this is in the dot then");
//     console.log("we'll do task on the API data");
//   } catch (error) {
//     console.error("Error:", error);
//   }

//   // this will not be printed just like funciton 1 cause .... read the conclusion.

//   console.log("this is outside the .then()");
// }

//main thread tasks

console.log("heyyy your sum is 0 as of now ");

get_data();

get_data()

// Additional tasks on the main thread
var sum = 0,
  time_consuming_task = 0;
for (let i = 0; i < 100; i++) {
  sum = sum + i;
}

console.log(sum);

// Additional expensive tasks on the main thread
for (let i = 0; i < 10000000000; i++) {
  time_consuming_task = time_consuming_task + i;
}

console.log(time_consuming_task);

// CONCLUSION

// AS NOW YOU ARE READING THE CONCLUSION YOU HAVE TRIED BOTH THE FUNCTIONS AND THE OUTPUT YOU SEE IS SOMEWHAT SIMILAR BUT A LITTLE DIFFERENT.
//THE DIFFERENCE WAS IN        "this is outside the .then" line.
// IN .then Version:
//when you call myP.then(...), the .then block is registered as a callback to be executed when the promise is resolved.
//However, the code after it (console.log("this is outside the dot then")) is not blocked. It continues executing immediately after registering the callback.
//When the promise is resolved, the callback is added to the callback queue, and the event loop will execute it when the call stack is empty.

// IN async/await Version:
//await myP, the await expression pauses the execution of the get_data function until the promise is resolved. The subsequent code
//(console.log("this is outside the dot then")) is not executed until after the promise is resolved.


//also the expenise operation had helped you to understand the JS architecture.
