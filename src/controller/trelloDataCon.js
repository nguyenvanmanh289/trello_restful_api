const {trelloDataBoarder,trelloDataLister,trelloDataCarter} = require("../services/trelloDataService.js")

class trelloDataBoardCon{
    createBoard = async (req,res,next)=>{
        try{
            let result = await trelloDataBoarder.create(req.username,req.body);
            if(result){
                res.status(200).json({
                    message : "tao board thanh cong",
                    board : result
                })
            }
            else{
                res.status(404).json({
                    message : "tao board that bai"
                })
            }
        }
        catch(err){
            console.log("err control")
            next(err)
        }
    }
    readBoard = async (req,res,next)=>{
        let boards = await trelloDataBoarder.read(req.username);
        if(boards){
            res.status(200).json({
                message : "danh sach board : ",
                boards : boards
            })
        }
        else{
            res.status(404).json({
                message : "tai khoan chua tao board nao"
            })
        }
    }
    updateBoard = async (req,res,next)=>{
        try{
            let newdata = {
                boardTitle:req.body.boardTitle
            }
            let result = await trelloDataBoarder.update(req.body.boardId,newdata);
            if(result){
                res.status(200).json({
                    message : "update thanh cong", 
                })
            }
            else{
                res.status(404).json({
                    message : "update board that bai"
                })
            }
        }
        catch(err){
            next(err);
        }
    }
    deleteBoard = async (req,res,next)=>{
        let result = await trelloDataBoarder.delete(req.username,req.query.boardId);
        if(result){
            res.status(200).json({
                message : "xoa thanh cong", 
            })
        }
        else{
            res.status(404).json({
                message : "khong tim thay board de xoa"
            })
        }
    }

}

module.exports = new trelloDataBoardCon;