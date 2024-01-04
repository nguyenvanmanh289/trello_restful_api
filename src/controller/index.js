const accountService = require("../services/accountService.js");
const authToken = require("../middlewares/authToken.js");

class Account{
    async login(req,res,next) {
        try{
            let result = await accountService.read(req.body);   
            if(result){
                let token = await authToken(req.body);
                res.status(200).json({
                    message: "dang nhap thanh cong",
                    username : req.body.username,
                    password : req.body.password,
                    token : token
                })
            
            }
            else{
                res.status(404).json({
                    message: "tai khoan khong ton tai"
                })
            }
        }
        catch(err){
            next(err);
        }
    }

    async update(req,res,next){
        try {
            let logined = {
                username:req.username ,
                password: req.password
            }
            let result = await accountService.update(logined, req.body);
            if (result) {
                let token = authToken(req.body);
                res.status(200).json({
                    message: "update thanh cong",
                    old_username: req.username,
                    old_password: req.password,
                    new_username: req.body.username,
                    new_password: req.body.password,
                    new_token:token
                })
            }
            else {
                res.status(404).json({
                    message: " cap nhap tai khoan that bai !"
                })
            }
        }
        catch (err) {
            next(err);
        }
    }

    async create(req,res,next){
       try{ 
            let result =  await accountService.create(req.body)

            if(result){
                let token = authToken(req.body);
                res.status(200).json({
                    message: "tao tai khaon thanh cong",
                    username: req.body.username,
                    password: req.body.password,
                    token : token
                })
            }
            else{
                res.status(403).json({
                    message:`khong the tao tai khoan \n tai khoan ${req.body.username} da ton tai` 
                })
            }
       }
       catch(err){
         next(err);
       }
    }

    async delete(req,res,next){
       try{
            let logined = {
                username:req.username ,
                password: req.password
            }
            let result = await accountService.delete(logined);
            if(result){
                res.status(200).json({
                    message: "xoa thanh cong",
                    username:req.username,
                    password:req.password
                })
            }
            else{
                res.status(404).json({
                    message:" xoa tai khoan that bai !"
                })
            }
       }
       catch(err){
        next(err);
       }
    
    }
}


module.exports = new Account;