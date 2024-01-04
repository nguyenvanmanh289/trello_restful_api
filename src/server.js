const express = require("express");
const app = express();

var bodyParser = require('body-parser');
require('dotenv').config();
const port = process.env.PORT;
const err = require("./middlewares/errHandling.js");
const router = require("./routes/index.js");
const connectdb = require("../config/mongodb/index.js");


app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json())

app.use(router);

connectdb();

app.use(err);
app.listen(port,()=>{
    console.log("server run at on localhost:"+ port);
})