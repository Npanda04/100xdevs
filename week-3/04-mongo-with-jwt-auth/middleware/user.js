const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../constants");

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const { authorization } = req.headers;
    const token = authorization.split("Bearer ")[1];

    try{
        jwt.verify(token, SECRET_KEY);
        const {username} = jwt.decode(token);
        req.headers.username = username;
        next();
    }catch(err){
        res.json({
            msg: "Not authorised"
        })
    }
}

module.exports = userMiddleware;