const jwt = require("jsonwebtoken");
require('dotenv').config();


function authToken(payload){
   let token =  jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:"1h"})
   return token;
}

module.exports = authToken;