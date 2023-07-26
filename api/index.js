const express = require('express');
const cors = require('cors');
const  User = require('./models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('./data');

const server = express();
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "dfbnijbsvf19f41f4f487484f%$441g8f$";

server.use(cors());
server.use(express.json());
server.use(cookieParser());

server.post('/register',async (req,res)=>{
    const {name,email,password} = req.body.user
    try{
        const userDoc = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password,bcryptSalt)
        })
        res.json({success:true,data:userDoc});
    }catch(err){
        res.status(422).json({success:false,error:err.message});
    }
})

server.post('/login', async (req, res)=>{
    try{
        const {email,password} = req.body.user;
        const userDoc = await User.findOne({email})
        if(userDoc){
            const passOk = bcrypt.compareSync(password.toString(),userDoc.password);
            if(passOk){
                jwt.sign({email:userDoc.email,id:userDoc._id,name:userDoc.name},jwtSecret,{},(err,token)=>{
                    if(err) throw err;
                    res.cookie('token',token).json({success: true, data:userDoc,token:token});
                })
            }else{
                res.status(422).json({success: false, message:"credentials are not correct"});
            }
        }else{
            res.status(404).json({success: false, message:"not found"})
        }
    }catch(err){
        console.log("error login :: ",err);
    }
})

server.post('/profile', (req,res)=>{
    // const {token} = req.cookies;
    const {token} =  req.body;
    if(token){
        jwt.verify(token,jwtSecret,{},(err, user)=>{
            if(err) throw err;
            res.json(user);
        })
    }
});

server.listen(5500,()=>{
    console.log("listening on 5000")
})