const router = require('express').Router();
const UserModel = require('../models/user');

//Import JSON Webtoken
const jwt = require('jsonwebtoken');

//import bcrypt for encryption
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {

    //Hash The Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new UserModel({
        name : req.body.name,
        email: req.body.email,
        password: hashPassword
    });

    //check if user is already exists or not
    const emailExist = await UserModel.findOne({email :  req.body.email});
    if(emailExist){
        return res.status(400).json({
            "msg" : "Email already Exist"
        });
    }

    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch{
        res.status(400);
    }
});


//router Login
router.post('/login', async (req, res) => {

    //check if user is already exists or not
    const user = await UserModel.findOne({email :  req.body.email});
    if(!user){
        return res.status(400).json({
            "msg" : "Email is wrong"
        });
    }

    //check password is correct or not
    const valid = await bcrypt.compare(req.body.password, user.password);

    if(!valid){
        return res.status(400).json({
            "msg" : "Invalid Pasword",
            "Status" : 400
        });
    }

    //create and assign a token
    const token = jwt.sign({_id : user._id},TOKEN_SECRET = "Amazecodes");
    res.header('Auth-Token', token);

    res.json({
        "msg" : "Login Succesfull",
        'token' : token,
        "Status" : 200
    });

});

module.exports = router;