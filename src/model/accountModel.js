const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    username: String, 
    password:String,
    boardId : [String]
});

const trelloAccount = mongoose.model("TrelloAccount",userSchema);

module.exports = trelloAccount;