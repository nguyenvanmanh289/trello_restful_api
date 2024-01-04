require('dotenv').config();

function err(err,req,res,next){
    //if err auto send statuscode 500 to client 
    console.log(err)
    res.status(err.statusCode).json({
        statusCode : err.statusCode,
        message : err.message,
        stack : process.env.NODE_ENV === 'production' ? '' : err.stack
    })
}

module.exports = err;