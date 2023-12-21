const express = require("express");
const z = require("zod");
const PORT = 3001;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("up n up and running");
});

// IN THIS WE'LL LEARN INPUT VALIDATION USING ZOD, MIDDLEWARE AND GLOBAL CATCHES.

// Simple post request taking users details. for ease i'm taking a user input in which i ask for his/her
// name, email, phone, age

const User = [];
app.post("/without-zod", (req, res) => {
  //fetching details from req.body

  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const age = req.body.age;

  //creating a new obj of details
  const newUser = {
    username: name,
    user_email: email,
    user_phone: phone,
    user_age: age,
  };

  User.push(newUser);
  res.send(User);
});

// this post req works correctly as it just taking the input from user and storing it in local variable assume it as a DB.

//{
//     "name": "deepanshu",
//     "email": "random",
//     "phone": 642883,                  ------------> this is the input for the above post request
//     "age" : 124343
// }

// [
//     {
//         "username": "deepanshu",
//         "user_email": "random",           ------------> this is the output from the same post request.
//         "user_phone": 642883,
//         "user_age": 124343
//     }
// ]

// CONCLUSION AS YOU CAN SEE FROM THE OUTPUT THAT EMAIL, PHONE AND AGE IS NOT A VALID INPUTS WHICH IS VERY WACK AND NOT RIGHT AT ALL.
// TO ENCOUNTER IS WE CAN CREATE CUSTOM CHECK FOR EACH n EVERY INPUT ON OUR OWN. WHICH SOUNDS TOO MUCH OF HARD WORK AND NO ONE LIKES IT.
// THEREFORE WE'LL USE ZOD WHICH IS A INPUT LIBRARY.

// input validation using zod

//taking the above example and try to make it ZOD proof.
//as we know our input's are:-

// name which should be a string with a character limit
// email which should be a string with email validation. should contain @ .co .com etc            --------------> textual schema
// phone which must be a number of strictly 10 digits. we are in india tahst why
// age which should be a number but not more than 100.

// as we can see we have create a schema for our input ki bhaiya our input should look like this then its a valid input or else !valid





const userSchema = z.object({
  name: z.string().min(1).max(50),
  email: z.string().email(),
  phone: z.number().refine((value) => /^\d{10}$/.test(String(value)), {   //             --------------------------> coded schema.
    message: "Phone must be a number with exactly 10 digits",
  }),
  age: z.number().int().min(1).max(100),
});




const onlyValidUser = []
app.post("/with-zod", (req, res) => {
  const validateUser = userSchema.safeParse(req.body);     // parsing the request to check weather its ok or not
  
  if (!validateUser.success) {                                                  
    res.status(411).json({
      error: "Input is not valid",                             // if not ok send this
      details: validateUser.error.errors,
    });
  } else {
    const {name , email, phone, age } = req.body;
    const newUser = {
        username : name,
        user_email : email,
        user_phone: phone,
        user_age: age,
    }

    onlyValidUser.push(newUser)
    res.send(onlyValidUser);                              // else your input is valid and save it to the local variable or DB.
  }
});



// this post req works correctly as it not just taking the input from user and storing it in local variable but also check weather the given
// input is correct or not and then storing it to the local variable or a DB.


// {
//     "name": "deepu",
//     "email": "rando@mmail.com",         ------------> this is the input for the ZODIFIED post request
//     "phone": 123456789,
//     "age" : 35
// }

// {
//     "error": "Input is not valid",
//     "details": [
//         {
//             "code": "custom",
//             "message": "Phone must be a number with exactly 10 digits",      ------------> this is the output from the same post request.                    
//             "path": [                                                                       As the given input was wrong.
//                 "phone"
//             ]
//         }
//     ]
// }


// {
//     "name": "deepu",
//     "email": "rando@mmail.com",            ---------------> correct input according to schema.
//     "phone": 1234567890,
//     "age" : 35
// }


// [
//     {
//         "username": "deepu",
//         "user_email": "rando@mmail.com",               --------------> showing the expected output.
//         "user_phone": 1234567890,
//         "user_age": 35
//     }
// ]


// CONCLUSION AS YOU CAN SEE FROM THE ABOVE 2 OUTPUT'S THAT NOW OUR POST REQUEST IS MORE SECURE IN TERMS OF TAKING VALID INPUTS
// WHICH WAS NOT THE CASE FOR POST REQUEST FOR WITHOUT-ZOD ROUTE
// THEREFORE WE USE ZOD TO VALIDATE INPUTS.


//LETS MAKE OUR ABOVE POST REQUEST USING MIDDLEWARE.


//this is a middleware which checks weather the given input is wrong or right 

function zodifiy(req, res, next){
    const validateUser = userSchema.safeParse(req.body);  
    if (!validateUser.success) {                                                  
    res.status(411).json({
      error: "Input is not valid",                             // if not ok send this
      details: validateUser.error.errors,
        })

    // next(validateUser.error);           //---------> as of now ignore this.
    }else{
        next();         //        ----------------> in this case next mean go to the next fucntion in the post request which is (req, res).
    }
}


const validate_user = []
app.post("/zodfied-middleware", zodifiy ,(req, res) =>{                 // ---------------> zodify is the middleware 
    const {name , email, phone, age } = req.body;
    const newUser = {
        username : name,
        user_email : email,
        user_phone: phone,
        user_age: age,
    }

    validate_user.push(newUser)
    res.send(validate_user); 

})

//CONCLUSION AS YOU CAN SEE WE DIDN'T DO MUCH IN ABOVE ROUTE ALL WE DID IS KI BHAIYA IF VALA BLOCK UTHA K EK FUCNTION M DAL DIYA HAI AND CALLED THAT 
//FUCNTION IN OUR ROUTE. 

// THE FUNCTIONING WILL BE LIKE REQUEST WILL HIT THE ROUTE AND SEES THAT OH THERE A MIDDLEWARE IT WILL GO THERE AND PERFORM TASKS WHICH ARE IT MIDDLEWARE AND 
//IT THE PROCESS HITS THE NEXT() THEN IT WILL COME BACK TO THE ORIGINAL ROUTE AND PERFORMS THE NEXT FUNCTION IN OUR CASE WHICH IS (req, res).

// AS YOU CAN SEE OUR ROUTE IS A LOT CLEANER AND WE CAN SEE THE FUNCTIONALITY OF OUR ROUTE.
//WHAT-IF WE HAVE TO PERFORM 3-4 MORE CHECKS BEFORING DOING THE ACTUAL TASK THEN THESE MIDDLEWARE'S COME IN HANDY.






// I HAVE TRIED TO COVER GLOBAL CATCHES IN THIS AS WELL. ITS JUST A WAY OF SENDING ERRORS FRM ONE PLACE.
// IF YOU WANT TO TRY GC THEN JUST SIMPLY UNCOMMENT LINE NUMBER 217 - 228 AND 174. AND COMMENT OUT LINE NUMBER 169 - 172. THEN JUST HIT THE /ZODFIED-MIDDLEWARE.





app.use((err, req, res, next) => {
    
    if (err instanceof z.ZodError) {
      res.status(422).send("validation error and this msg is from global catch ");
    } else {


      // Handle other types of errors
      console.error(err);
      res.status(500).send("Internal server error msg from global catch")
    }
  });




app.listen(PORT);
