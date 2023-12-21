const { User } = require("../db/index");

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected



    const username = req.header.username;
    const password = req.header.password;

    const user = await User.findOne({username:username, password:password});


    if(user.username){
        next();
    }else{
        res.status(404).json({error: "user not found"})
    }


}

module.exports = userMiddleware;