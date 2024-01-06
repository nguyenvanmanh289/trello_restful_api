const express = require("express");
const router = express.Router();
//================middle ware validate =========================
    //VALIDATE CREATE
const validateUserDataInputC = require("../middlewares/validateData/create/validateDataInputC.js");
const validateBoardC = require("../middlewares/validateData/create/validateBoardC.js")
const validateListC = require("../middlewares/validateData/create/validateListC.js")
const validateCardC = require("../middlewares/validateData/create/validateCardC.js")
 
    //VALIDATE UPDATE
const validateBoardU = require("../middlewares/validateData/update/validateBoardU.js");
const validateListU = require("../middlewares/validateData/update/validateListU.js");
const validateCardU = require("../middlewares/validateData/update/validateCardU.js");
const validateUserDataInputU = require("../middlewares/validateData/update/validateDataInputU.js");

    //VALIDATE READ
const validateListR = require("../middlewares/validateData/read/validateListR.js");
const validateCardR = require("../middlewares/validateData/read/validateCardR.js");

    //VALIDATE DELETE
const validateBoardD = require("../middlewares/validateData/delete/validateBoardD.js");
const validateListD = require("../middlewares/validateData/delete/validateListD.js");
const validateCardD = require("../middlewares/validateData/delete/validateCardD.js");

//=========CONTROLLER==========================================
const Account = require("../controller/index.js");
const dataBoard = require("../controller/trelloDataBoardCon.js");
const dataList = require("../controller/trelloDataListCon.js");
const dataCard = require("../controller/trelloDataCardCon.js");

//==========TOKEN==============================================
const verifyToken = require("../middlewares/veryfyToken.js");

//==========FILE UPLOAD========================================
const fileUpload = require("../middlewares/uploadFile.js");

//==========ROUTER=============================================
router.post("/login",Account.login);
router.post("/signup",validateUserDataInputC,Account.create);
router.put("/editAccount",validateUserDataInputU,verifyToken,Account.update);
router.delete("/deleteAccount",verifyToken,Account.delete);

//route api board
router.get("/boards",verifyToken,dataBoard.readBoard);
router.post("/createBoard",verifyToken,validateBoardC,dataBoard.createBoard);
router.put("/updateBoard",verifyToken,validateBoardU,dataBoard.updateBoard);
router.delete("/deleteBoard",verifyToken,validateBoardD,dataBoard.deleteBoard);

//route api list
router.get("/Lists",verifyToken,validateListR,dataList.readList);
router.post("/createList",verifyToken,validateListC,dataList.createList);
router.put("/updateList",verifyToken,validateListU,dataList.updateList);
router.delete("/deleteList",verifyToken,validateListD,dataList.deleteList);

//route api card
router.get("/Cards",verifyToken,validateCardR,dataCard.readCard);
router.post("/createCard",verifyToken,validateCardC,dataCard.createCard);
router.put("/updateCard",verifyToken,validateCardU,dataCard.updateCard);
router.delete("/deleteCard",verifyToken,validateCardD,dataCard.deleteCard);

module.exports = router;