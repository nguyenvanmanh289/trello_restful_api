const trelloDataLister = require("../services/ListService.js");

class trelloDataListCon{
    createList = async (req,res,next)=>{
        try{
            let result = await trelloDataLister.create(req.body.boardId,req.body);
            if(result){
                res.status(200).json({
                    message : `tao list trong boardId: ${req.body.boardId} thanh cong`,
                    list : result
                })
            }
            else{
                res.status(404).json({
                    message : "tao list that bai"
                })
            }
        }
        catch(err){
            console.log("err control")
            next(err)
        }
    }
    readList = async (req,res,next)=>{
        let lists = await trelloDataLister.read(req.body.boardId);
        if(lists){
            res.status(200).json({
                message : "danh sach : ",
                lists : lists
            })
        }
        else{
            res.status(404).json({
                message : "board chua tao list nao"
            })
        }
    }
    updateList = async (req,res,next)=>{
        try{
            let newdata = {
                listTitle:req.body.listTitle
            }
            let result = await trelloDataLister.update(req.body.listId,newdata);
            if(result){
                res.status(200).json({
                    message : "update thanh cong", 
                })
            }
            else{
                res.status(404).json({
                    message : "update list that bai"
                })
            }
        }
        catch(err){
            next(err);
        }
    }
    deleteList = async (req,res,next)=>{
        let result = await trelloDataLister.delete(req.query.boardId,req.query.listId);
        if(result){
            res.status(200).json({
                message : "xoa thanh cong", 
            })
        }
        else{
            res.status(404).json({
                message : "khong tim thay list de xoa"
            })
        }
    }

}

module.exports = new trelloDataListCon;