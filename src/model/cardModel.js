const  mongoose  = require("mongoose");
const dataSchema = new mongoose.Schema({
    cardId : String,
    cardInListId : String,
    cardTitle : String,
    cardDes : String,
    cardDate : Date,
    cardDueDate : String,
    cardAttachment : {
        originalname: String,
        buffer:Buffer
    },
    cardListfile : [],
    cardMember : String
})

const cardModel = mongoose.model("cardData",dataSchema);
module.exports = cardModel;
