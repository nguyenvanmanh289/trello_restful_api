const express = require("express");
const app = express();

const multer = require("multer");
var bodyParser = require('body-parser');

require('dotenv').config();
const port = process.env.PORT;
const err = require("./middlewares/errHandling.js");
const router = require("./routes/index.js");
const connectdb = require("../config/mongodb/index.js");

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const upload = multer();
var cpUpload = upload.fields([
    { name: 'file', maxCount: 1 },
    { name: 'listfile', maxCount: 8 },
  ]);
app.use(cpUpload);

app.use(router);

connectdb();

app.use(err);
app.listen(port,()=>{
    console.log("server run at on localhost:"+ port);
})