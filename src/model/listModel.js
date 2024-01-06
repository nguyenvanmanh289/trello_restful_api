const  mongoose  = require("mongoose");
const dataSchema = new mongoose.Schema({
    listId : String,
    listTitle : String,
    listDate : Date,
    cards : Array
})

const listModel = mongoose.model("listData",dataSchema);
module.exports = listModel;