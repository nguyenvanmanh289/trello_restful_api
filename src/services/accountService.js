const modelAccount = require("../model/accountModel");
const boardModel = require("../model/boardModel");
const listModel = require("../model/listModel");
const cardModel = require("../model/cardModel");

class accountService{

    async read({username,password}){
        try {
            let isfound = await modelAccount.find({ username: username, password: password })
            if (isfound.length > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            throw err
        }
    }

    async create({username,password}){
        try {
            let isfound = await modelAccount.find({ username: username })
            console.log(isfound.length)
            if (isfound.length > 0) {
                return false
            }
            else {
                let userAccount = new modelAccount();
                userAccount.username = username;
                userAccount.password = password;
                await userAccount.save();
                return true;
                }
            }
        catch (err) {
            throw err
        }   
    }
    async update(logined,newaccount){
        try {
            let check = await modelAccount.updateOne(logined, newaccount)
            if (check.acknowledged) {
                return (true)
            }
            else {
                return (false)
            }
        }
        catch (err) {
            throw err
        }
    }
    async delete(logined){
        try {
            //delete boards in some user
            let acc = await modelAccount.findOne(logined);
            console.log("============",acc)
            let boardArrId = acc.boardId;
            if(boardArrId.length>0){
                await Promise.all(boardArrId.map(async (boardId)=>{
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
                    
                    await boardModel.deleteMany({boardInAcc : logined.username});

                }
                catch(err){
                    console.log(err);
                    throw err;
                }
            }))
            }
            




            let isfound = await modelAccount.deleteOne(logined);
            if (isfound.deletedCount === 1) {
                return (true)
            }
            else {
                return (false)
            }
        }
        catch (err) {
            throw err
        }
    }
}

module.exports = new accountService();