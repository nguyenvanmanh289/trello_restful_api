const listModel = require("../model/listModel.js");
const cardModel = require("../model/cardModel.js");
const boardModel = require("../model/boardModel.js");
const accountModel = require("../model/accountModel.js");

var uniqid = require('uniqid'); 

class trelloDataCard{
    create = async (listId,fileob,dataCard,listFile)=>{
        try{

            // console.log("dataCrd " ,dataCard)
            // console.log("file ",fileob)
            let fileobject = {
                originalname:fileob.originalname,
                buffer : fileob.buffer
            }

            let CREATER = new cardModel();
            let id = uniqid("card-");
            CREATER.cardId = id;
            CREATER.cardInListId = listId;
            CREATER.cardTitle = dataCard.title;
            CREATER.cardDes = dataCard.describe;
            CREATER.cardDueDate = dataCard.duedate;
            CREATER.cardDate = new Date();
            CREATER.cardAttachment = fileobject;
            CREATER.cardMember = dataCard.member;
            CREATER.cardListfile = listFile;
            await CREATER.save();

            // console.log("listId ",listId);
          let checkList = await listModel.updateOne({ listId: listId }, { $push: { cards: id } });
          if(checkList.modifiedCount == 0) return false;
          return {
                cardId : id,
                cardTitle : dataCard.title,
                cardDes : new Date(),
                cardDueDate : dataCard.duedate,
                cardDate : new Date(),
                cardAttachment : "hide data",
                cardMember : dataCard.member,
                cardListfile : "hide data"
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
            // console.log(info.cards , info.cards.length)
            if(info.cards.length == 0){
                return false
            }
            await Promise.all(info.cards.map(async (cardId, index) => {
                cards.push(await cardModel.findOne({ cardId: cardId }));
                // console.log(index);
            }))
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


   
    readOnly =  async(logined,title) =>{
        try {
            let cardlist = [];
            //delete boards in some user
            let acc = await accountModel.findOne(logined);
            let boardArrId = acc.boardId;
            if (boardArrId.length > 0) {
                await Promise.all(boardArrId.map(async (boardId) => {
                    try {
                        let board = await boardModel.findOne({ boardId: boardId });
                        let listArrId = board.lists;
                        if (listArrId.length > 0) {
                            await Promise.all(listArrId.map(async (listId) => {
                                try {
                                    //find all card in some list then delete this list
                                    let cards = await cardModel.find({ cardInListId: listId });
                                    cardlist.push(cards[0]);
                                }
                                catch (err) {
                                    console.log(err);
                                    throw err;
                                }
                            }))
                        }
                       
                    }
                    catch (err) {
                        console.log(err);
                        throw err;
                    }
                }))
            }
            function matchTitle(str1, str2) {
                // Đảm bảo cả hai chuỗi đều có độ dài lớn hơn 0
                if (str1.length === 0 || str2.length === 0) {
                    return 0;
                }
                // Tính độ dài lớn nhất của hai chuỗi
                const doDaiLonNhat = Math.max(str1.length, str2.length);
            
                // Tính số ký tự khớp nhau
                let soKyTuKhop = 0;
                for (let i = 0; i < doDaiLonNhat; i++) {
                    if (str1[i] && str2[i] && str1[i] === str2[i]) {
                        soKyTuKhop++;
                    }
                }
                // Tính tỷ lệ khớp
                const matchCentre = (soKyTuKhop / doDaiLonNhat) * 100;
                return matchCentre;
            }

            let id = 0;
            let matchPoint = 0;
            cardlist.map((card,index)=>{ 
                let point = matchTitle(card.cardTitle,title);
                if( matchPoint < point){
                    matchPoint = point;
                    id = index;
                };
            })

            return cardlist[id];
            
        }
        catch (err) {
            throw err
        }
    }
}

module.exports = new trelloDataCard;