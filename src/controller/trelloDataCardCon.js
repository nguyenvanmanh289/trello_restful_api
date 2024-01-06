const trelloDataCarder = require("../services/CardService.js");

class trelloDataCardCon{
    createCard = async (req,res,next)=>{
        try{
            let fileob = req.files[0];
            let body = req.body;
            let listId = req.body.listId;

            let result = await trelloDataCarder.create(listId,fileob,body);
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
                message : "danh sach : ",
                cards : cards
            })
        }
        else{
            res.status(404).json({
                message : "list chua tao card nao"
            })
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
            
            if((req.files[0].originalname).length > 0){
                newdata.cardAttachment = {
                    originalname : req.files[0].originalname,
                    buffer:req.files[0].buffer
                }
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