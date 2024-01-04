const express = require("express");
const router = express.Router();
const validateUserDataInput = require("../middlewares/validateDataInput.js")
const Account = require("../controller/index.js");
const dataBoard = require("../controller/trelloDataBoardCon.js");
const dataList = require("../controller/trelloDataListCon.js");

const verifyToken = require("../middlewares/veryfyToken.js");

router.post("/login",Account.login);
router.post("/signup",validateUserDataInput,Account.create);
router.put("/editAccount",validateUserDataInput,verifyToken,Account.update);
router.delete("/deleteAccount",verifyToken,Account.delete);

//route api board
router.get("/boards",verifyToken,dataBoard.readBoard);
router.post("/createBoard",verifyToken,dataBoard.createBoard);
router.put("/updateBoard",verifyToken,dataBoard.updateBoard);
router.delete("/deleteBoard",verifyToken,dataBoard.deleteBoard);

//route api list
router.get("/Lists",verifyToken,dataList.readList);
router.post("/createList",verifyToken,dataList.createList);
router.put("/updateList",verifyToken,dataList.updateList);
router.delete("/deleteList",verifyToken,dataList.deleteList);

module.exports = router;