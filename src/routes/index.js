const express = require("express");
const router = express.Router();
const route = require("./useRoute.js");

router.use("/home",route);


module.exports = router;