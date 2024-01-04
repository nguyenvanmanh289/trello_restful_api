const  mongoose  = require("mongoose");
const dataSchema = new mongoose.Schema({
    cardId : String,
    cardTitle : String,
    cardDes : String,
    cardDate : Date,
    cardDueDate : Date,
    cardAttachment : Buffer,
    cardMember : Array
})

const cardModel = mongoose.model("cardData",dataSchema);
module.exports = cardModel;