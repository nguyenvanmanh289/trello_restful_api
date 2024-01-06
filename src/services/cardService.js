const listModel = require("../model/listModel.js");
const cardModel = require("../model/cardModel.js");

var uniqid = require('uniqid'); 

class trelloDataCard{
    create = async (listId,fileob,dataCard)=>{
        try{

            console.log("dataCrd " ,dataCard)
            console.log("file ",fileob)
            let fileobject = {
                originalname:fileob.originalname,
                buffer : fileob.buffer
            }

            let CREATER = new cardModel();
            let id = uniqid();
            CREATER.cardId = id;
            CREATER.cardTitle = dataCard.title;
            CREATER.cardDes = dataCard.describe;
            CREATER.cardDueDate = dataCard.duedate;
            CREATER.cardDate = new Date();
            CREATER.cardAttachment = fileobject;
            CREATER.cardMember = dataCard.member;
            await CREATER.save();

            console.log("listId ",listId);
          let checkList = await listModel.updateOne({ listId: listId }, { $push: { cards: id } });
          if(checkList.modifiedCount == 0) return false;
          return {
                cardId : id,
                cardTitle : dataCard.title,
                cardDes : new Date(),
                cardDueDate : dataCard.duedate,
                cardDate : new Date(),
                cardAttachment : fileobject,
                cardMember : dataCard.member
           };
        }
        catch(err){
            console.log(err)
            return false
        }
    }
    read = async (listId)=>{
        try {
            let cards = [];
            let info = await listModel.findOne( {listId : listId} );
            console.log(info.cards , info.cards.length)
            if(info.cards.length == 0){
                return false
            }
            await Promise.all(info.cards.map(async (listId, index) => {
                cards.push(await listModel.findOne({ listId: listId }));
                console.log(index);
            }));
            console.log(cards)
            return cards;
        }
        catch(err){
            return false
        }
    }
    update = async (cardId,newdata)=>{
        try{
            await cardModel.updateOne( {cardId:cardId} ,newdata);
            return true
        }
        catch(err){
            return false;
        }
    }
    delete = async (listId, cardId) => {
        try {
            const accountUpdateResult = await listModel.updateOne(
                { listId: listId },
                { $pull: { cards: cardId } }
            );
            const cardDeleteResult = await cardModel.deleteOne({ cardId: cardId });
            if (accountUpdateResult.modifiedCount > 0 && cardDeleteResult.deletedCount > 0) {
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

module.exports = new trelloDataCard;