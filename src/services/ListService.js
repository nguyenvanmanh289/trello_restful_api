const listModel = require("../model/listModel.js");
const boardModel = require("../model/boardModel.js");

var uniqid = require('uniqid'); 

class trelloDataList{
    create = async (boardId , dataList)=>{
        try{
            let CREATER = new listModel();
            let id = uniqid();
            CREATER.listId = id,
            CREATER.listTitle = dataList.title;
            CREATER.listDate = new Date();
            CREATER.lists = [];
            await CREATER.save();
            await boardModel.updateOne({ boardId: boardId }, { $push: { lists: id } });
           return {
                listId : id,
                listTitle : dataList.title,
                boardDate : new Date(),
                Cards : []
           };
        }
        catch(err){
            console.log("err sevrice")
            return false
        }
    }
    read = async (boardId)=>{
        try {
            let lists = [];
            let info = await boardModel.findOne( {boardId : boardId} );
            console.log(info.lists , info.lists.length)
            if(info.lists.length == 0){
                return false
            }
            await Promise.all(info.lists.map(async (listId, index) => {
                lists.push(await listModel.findOne({ listId: listId }));
                console.log(index);
            }));
            console.log(lists)
            return lists;
        }
        catch(err){
            return false
        }
    }
    update = async (listId,newdata)=>{
        try{
            await listModel.updateOne( {listId:listId} ,newdata);
            return true
        }
        catch(err){
            return false;
        }
    }
    delete = async (boardId, listId) => {
        try {
            const accountUpdateResult = await boardModel.updateOne(
                { boardId: boardId },
                { $pull: { lists: listId } }
            );
            const boardDeleteResult = await listModel.deleteOne({ listId: listId });
            if (accountUpdateResult.modifiedCount > 0 && boardDeleteResult.deletedCount > 0) {
                return true;
            } else {
                console.log("loi else")
                return false;

            }

        } catch (err) {
            console.log("loi catch ")
            return false;
            
        }
    };
}

module.exports = new trelloDataList;