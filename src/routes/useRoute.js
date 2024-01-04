const express = require("express");
const router = express.Router();
const validateUserDataInput = require("../middlewares/validateDataInput.js")
const Account = require("../controller/index.js");
const dataBoard = require("../controller/trelloDataCon.js");

const verifyToken = require("../middlewares/veryfyToken.js");

router.post("/login",Account.login);
router.post("/signup",validateUserDataInput,Account.create);
router.put("/editAccount",validateUserDataInput,verifyToken,Account.update);
router.delete("/deleteAccount",verifyToken,Account.delete);

//route api board
router.get("/boards",verifyToken,dataBoard.readBoard);
router.post("/createBoard",verifyToken,dataBoard.createBoard);
router.post("/updateBoard",verifyToken,dataBoard.updateBoard);
router.delete("/deleteBoard",verifyToken,dataBoard.deleteBoard);

module.exports = router;