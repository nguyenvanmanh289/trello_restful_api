const trelloDataModel = require("../model/trellodata.js");
const modelAccount = require("../model/accountModel.js");
var uniqid = require('uniqid'); 

const CREATER = new trelloDataModel();

class trelloDataBoard{
    create = async (username,dataBoard)=>{
        try{
            let id = uniqid();
            CREATER.boardId = id,
            CREATER.boardTitle = dataBoard.title;
            CREATER.boardDate = new Date();
            CREATER.lists = [];
            await CREATER.save();
            await modelAccount.updateOne({ username: username }, { $push: { boardId: id } });
           return {
                boardId : id,
                boardTitle : dataBoard.title,
                boardDate : new Date(),
                lists : []
           };
        }
        catch(err){
            console.log("err sevrice")
            return false
        }
    }
    read = async (username)=>{
        try {
            let board = [];
            let info = await modelAccount.findOne({username:username});
            console.log(info.boardId , info.boardId.length)
            if(info.boardId.length == 0){
                return false
            }
            await Promise.all(info.boardId.map(async (boardId, index) => {
                board.push(await trelloDataModel.findOne({ boardId: boardId }));
                console.log(index);
            }));
            console.log(board)
            return board;
        }
        catch(err){
            return false
        }
    }
    update = async (boardId,newdata)=>{
        try{
            await trelloDataModel.updateOne({boardId:boardId},newdata);
            return true
        }
        catch(err){
            return false;
        }
    }
    delete = async (username, boardId) => {
        try {
            console.log(username , boardId);
            const accountUpdateResult = await modelAccount.updateOne(
                { username: username },
                { $pull: { boardId: boardId } }
            );
    
            const boardDeleteResult = await trelloDataModel.deleteOne({ boardId: boardId });
    
            console.log(boardDeleteResult.deletedCount , accountUpdateResult.modifiedCount )
            if (accountUpdateResult.modifiedCount > 0 && boardDeleteResult.deletedCount > 0) {
                return true;
            } else {
                return false;
            }

        } catch (err) {
            return false;
        }
    };

}

class trelloDataList{
    create = async ()=>{

    }
    read = async ()=>{

    }
    update = async ()=>{

    }
    delete = async ()=>{

    }
}

class trelloDataCart{
    create = async ()=>{

    }
    read = async ()=>{

    }
    update = async ()=>{

    }
    delete = async ()=>{

    }
}


module.exports = {
    trelloDataBoarder :new trelloDataBoard,
    l :new trelloDataList,
    c :new trelloDataCart
};