const trelloDataModel = require("../model/boardModel.js");
const modelAccount = require("../model/accountModel.js");
var uniqid = require('uniqid'); 



class trelloDataBoard{
    create = async (username,dataBoard)=>{
        try{
            let CREATER = new trelloDataModel();
            let id = uniqid("board-");
            CREATER.boardId = id;
            CREATER.boardInAcc = username;
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

            let board = await boardModel.findOne({ boardId: boardId });
            let listArrId = board.lists;
            if (listArrId.length > 0) {
                await Promise.all(listArrId.map(async (listId) => {
                    try {
                        //delete all card in some list then delete this list
                        await cardModel.deleteMany({ cardInListId: listId });
                        await listModel.deleteOne({ listId: listId });
                    }
                    catch (err) {
                        console.log(err);
                        throw err;
                    }
                }))
            }

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


module.exports = new trelloDataBoard
    