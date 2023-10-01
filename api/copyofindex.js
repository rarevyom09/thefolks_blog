const express =require('express');
const cors =require('cors'); 
const mongoose =require("mongoose");
const User =require('./models/User');
const Post=require('./models/Post');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer =require('multer');

const uploadMiddleware = multer({dest: 'uploads/'});

const fs = require('fs');
//app settings
const app =express();
const salt=bcrypt.genSaltSync(10);
const secret='someRandomString';

app.use(cors({credentials:true , origin:'http://localhost:3000'}));

app.use(express.json());

app.use(cookieParser());

mongoose.connect('mongodb+srv://rarevyom:rare1234@vyom-cluster-0.jp77cjk.mongodb.net/blog_website');



app.post('/register', async (req,res)=>{
    const {username,password}=req.body;
    const userDoc=await User.create({
        username,
        password:bcrypt.hashSync(password , salt),
    });
    res.json(userDoc);
});

app.post('/login' , async (req,res)=>{
    const {username,password} = req.body;
    const userDoc=await User.findOne({username});
    const passOk=bcrypt.compareSync(password,userDoc.password);
    // res.json(passOk);
    if(passOk){
        //login
        jwt.sign({username,id:userDoc._id} , secret , {} , (err,token)=>{
            if(err) throw err;
            res.cookie('token',token).json({
                id:userDoc._id,
                username,
            });
        });
        // res.json()
    }
    else{
        res.status(400).json('wrong');
    }
})

app.get('/profile' , (req,res)=>{
    const {token} =req.cookies;
    jwt.verify(token,secret,{},(err,info)=>{
        if(err) throw err;
        res.json(info);
    })
    res.json(req.cookies);
});


app.post('/logout' , (req,res)=>{
    res.cookie('token' , '').json('ok');
});

app.post('/post' , uploadMiddleware.single('file') , async (req,res)=>{
    const {originalname ,path}=req.file;
    const parts=originalname.split('.');
    const ext=parts[parts.length-1];
    const newPath=path+'.'+ext;
    fs.renameSync(path,newPath);

    const {title,summary,content}=req.body;
    const postDoc = await Post.create({
        title,
        summary,
        content,
        cover:newPath,
    });

    res.json(postDoc);
});

app.get('/post' , async(req,res)=>{
    res.json(await Post.find());
});

app.listen(4000);