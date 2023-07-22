const express = require('express');
const cors = require('cors');
const  User = require('./models/user');
const bcrypt = require('bcryptjs');
require('./data');

const server = express();
const bcryptSalt = bcrypt.genSaltSync(10);

server.use(cors());
server.use(express.json());



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
    const {email,password} = req.body.user;
    const userDoc = await User.findOne({email})
    if(userDoc){
        res.json({success: true, message: userDoc})
        const passOk = bcrypt.compareSync(password,userDoc.password);
        if(passOk){
            res.status(400).json({success: true, message:"credentials are correct"});
        }else{
            res.status(422).json({success: false, message:"credentials are not correct"});
        }
    }else{
        res.status(404).json({success: false, message:"not found"})
    }

})

server.listen(5000,()=>{
    console.log("listening on 5000")
})