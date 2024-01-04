const modelAccount = require("../model/accountModel");
const userAccount = new modelAccount();

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
            let isfound = await modelAccount.find({ username: username, password: password })
            console.log(isfound.length)
            if (isfound.length > 0) {
                return false
            }
            else {
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