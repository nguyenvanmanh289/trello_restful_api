const  mongoose  = require("mongoose");
const dataSchema = new mongoose.Schema({
    cardId : String,
    cardTitle : String,
    cardDes : String,
    cardDate : Date,
    cardDueDate : String,
    cardAttachment : {
        originalname: String,
        buffer:Buffer
    },
    cardMember : String
})

const cardModel = mongoose.model("cardData",dataSchema);
module.exports = cardModel;
