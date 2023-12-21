// Middleware for handling auth
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../constants");

function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const { authorization } = req.headers;
    const token = authorization.split("Bearer ")[1];
    
    try{
        jwt.verify(token, SECRET_KEY);
        next();
    }catch(err){
        res.json({
            msg: "Not authorised"
        })
    }
}

module.exports = adminMiddleware;