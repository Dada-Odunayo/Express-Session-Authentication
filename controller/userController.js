
const User = require('../models/User');
const bcrypt = require("bcrypt");
const { v4:uuidv4 } = require('uuid');

const {validationResult} = require("express-validator")


exports.registerUser=async(req,res)=>{
        
            try{
                const errors = validationResult(req)
                if(!errors.isEmpty()){
                    return res.status(400).json({errors:errors.array()})
                }               
                const {name,email,password} = req.body;
                const userExist = await User.findOne({where:{email:email},})
                if(userExist){
                    return res.status(409).json({status:409,message:"User already exists"})
                }
                const saltRounds = 12
                const salt = bcrypt.genSaltSync(saltRounds);
                const hashedPassword = bcrypt.hashSync(password,salt)
                const newUser = await User.create({
                    id:uuidv4(),
                    name:name,
                    email:email,
                    password:hashedPassword
                })        
                return res.status(201).json({status:201,message:"User successfully created"})
                }
                catch{
                   return res.status(500).json({
                        status:500,
                        message:"Something went wrong. Try again"
                    })
                }
            }

exports.loginUser= async (req,res)=>{
    try{
                
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({status:400,error:errors.array()})
        }        
        const user = await User.findOne({where:{email:req.body.email},})
        //console.log(userExists)
        if(!user){
            return res.status(401).json({message:"Incorrect Credentials"})
        }
        console.log("gone past email")        
        const isPasswordValid = bcrypt.compareSync(req.body.password,user.password)
        console.log(isPasswordValid)
        if(!isPasswordValid){
            return res.status(401).json({status:401,message:"Incorrect Credentials"})
        }
        req.session.user = {
            id:user.id,
            name:user.name,
            email:user.email
        }
        const{password, ...others} = user.dataValues

        return res.status(200).json(others)

    }
    catch{
        return res.status(500).json({status:500,message:"Something went wrong.Try again"});        
    }
}

exports.protected = (req,res)=>{
    res.status(200).send("We made it here")
}