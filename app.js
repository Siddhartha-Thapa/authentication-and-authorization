// const cookieParser = require('cookie-parser');
// const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const server = express();
// server.use(cookieParser());
// //setting up cookie
// server.get('/',(req, res)=>{
//     res.cookie("name","siddhartha");
//     res.send('hi');
// })
// //cokkie comes along with any route example
// server.get('/user',(req, res)=>{
//     console.log(req.cookies);
//     res.send('hi user');
// })
// //how to hash a password using bcrypt
// server.get('/password', (req,res)=>{
//     bcrypt.genSalt(10,function(err,salt){
//         bcrypt.hash("password", salt , function(err,hash){
//             const hashedstr = hash
        
//         //decryption
//         bcrypt.compare("password",`${hashedstr}`, function(err, result){
//             console.log(result);
//         })
//     })
//     })
// });


// //jwt
// server.get('/jwt', (req, res)=>{
//     let token = jwt.sign({email : "siddharthathapa001@gmail.com"} , "secret");
//     res.cookie("token", token );
//     res.send("done");
// })

// server.get('/read' , (req, res)=>{
//     let data = jwt.verify(req.cookies.token , "secret");
//     console.log(data);
// })


// server.listen(3000);


const express = require('express');
const usersModel = require('./models/user');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const cookieParser = require('cookie-parser');
const path = require('path');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req , res)=>{
    res.render('index');
})


app.post('/create', (req,res)=>{
    let {username, email, password, age} = req.body;
    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(password, salt , async(err,hash)=>{
            let createduser = await usersModel.create({
            username,
            email,
            password : hash,
            age
            });


            let token = jwt.sign({email}, "secretkey");
            res.cookie("token", token);
            res.send(createduser);
        })
    })
});

app.get('/login',(req,res)=>{
    res.render('login'); 
})
app.post('/login', async(req,res)=>{
    let user = await usersModel.findOne({email : req.body.email});
    if(!user){
       return  res.send("Sonething went wrong");
    }
    bcrypt.compare(req.body.password , user.password, (err, result)=>{
        if(result){
            let token = jwt.sign({email : user.email}, "secretkey");
            res.cookie("token", token);
            
            return res.send("Logged in successfully");
        }
        else{
            return res.send("Something went wrong");
        }
    })
})
app.get('/logout', (req,res)=>{
    res.cookie("token", "");
    res.redirect('/');
})
app.listen(3000);