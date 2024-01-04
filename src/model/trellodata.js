const  mongoose  = require("mongoose");
const dataSchema = new mongoose.Schema({
    boardId : String,
    boardTitle : String,
    boardDate : Date,
    lists : [{
        listTitle : String,
        listDate : Date,
        listIndex : Number,
        Carts : [{
            cartTitle : String,
            cartDes : String,
            cartMember : [Object],
            cartAttachment : Buffer
        }]
    }]
})

const trelloDataModel = mongoose.model("trelloData",dataSchema);
module.exports = trelloDataModel;