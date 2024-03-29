const trelloDataCarder = require("../services/cardService.js");

class trelloDataCardCon{
    createCard = async (req,res,next)=>{
        try{

            let fileob = req.files["file"][0];
            let listFile = req.files["listfile"];
            let body = req.body;
            let listId = req.body.listId;

            let result = await trelloDataCarder.create(listId,fileob,body,listFile);
            if(result){
                res.status(200).json({
                    message : `tao Card trong listId: ${req.body.listId} thanh cong`,
                    card : result
                })
            }
            else{
                res.status(404).json({
                    message : "tao card that bai"
                })
            }
        }
        catch(err){
            console.log("err control")
            next(err)
        }
    }
    readCard = async (req,res,next)=>{
        let cards = await trelloDataCarder.read(req.body.listId);
        if(cards){
            res.status(200).json({
                message : `danh sach có ${cards.length}: `,
                cards : cards
            })
        }
        else{
            res.status(404).json({
                message : "list chua tao card nao"
            })
        }
    }

    readOnly = async (req,res,next)=>{
        try{
           let loginer = {
                username: req.username,
                password: req.password
            }
            let card = await trelloDataCarder.readOnly(loginer,req.query.title);
            res.status(200).json({
                message: "card khop nhat",
                card : card
            })
        }
        catch(err){
            console.log(err);
        }
        
        
    }

    updateCard = async (req,res,next)=>{
        try{
            let newdata = {
                cardDueDate: new Date()
            }
            if(req.body.title){
                newdata.cardTitle = req.body.title;
            }
            if(req.body.describe){
                newdata.cardDes = req.body.describe;
            }
            
            if((Object.keys(req.files).length > 0)){
                newdata.cardAttachment = {
                    originalname : req.files["file"][0].originalname,
                    buffer:req.files["file"][0].buffer
                }
                newdata.cardListfile = req.files["listfile"];
            }
            
            if(req.body.member){
                newdata.cardMember = req.body.member;
            }
                
            let result = await trelloDataCarder.update(req.body.cardId,newdata);
            if(result){
                res.status(200).json({
                    message : "update card thanh cong", 
                })
            }
            else{
                res.status(404).json({
                    message : "update card that bai"
                })
            }
        }
    
        catch(err){
            next(err);
        }
    }
    deleteCard = async (req,res,next)=>{
        let result = await trelloDataCarder.delete(req.query.listId,req.query.cardId);
        if(result){
            res.status(200).json({
                message : `xoa card co ID: ${req.query.cardId} thanh cong`, 
            })
        }
        else{
            res.status(404).json({
                message : "khong tim thay card de xoa"
            })
        }
    }

}

module.exports = new trelloDataCardCon;