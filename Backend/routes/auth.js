import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();


//  Signup 

router.post("/signup",async(req,res)=>{

    try{

        const {
            firstName,
            lastName,
            email,
            username,
            password
        } = req.body;

            if (
            !firstName ||
            !lastName ||
            !email ||
            !username ||
            !password
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const userExists = await User.findOne({
            $or:[
                {email},
                {username}
            ]
        });

        if(userExists){

            return res.status(400).json({
                message:"User already exists"
            });

        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = new User({

            firstName,
            lastName,
            email,
            username,
            password:hashedPassword

        });

        await user.save();

        res.status(201).json({
            message:"Signup Successful"
        });

    }

    catch(err){

        res.status(500).json({
            message:err.message
        });

    }

});




// Login 

router.post("/login",async(req,res)=>{

    try{

        const {email,password}=req.body;

           if (!email || !password) {
            return res.status(400).json({
                message: "Email and Password are required"
            });
        }

        const user = await User.findOne({email});

        if(!user){

            return res.status(400).json({
                message:"Invalid Credentials"
            });

        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){

            return res.status(400).json({
                message:"Invalid Credentials"
            });

        }

        const token = jwt.sign(

            {
                id:user._id
            },

            process.env.JWT_SECRET,

            {
                expiresIn:"7d"
            }

        );

        res.json({

            token,

            user:{

                id:user._id,

                firstName:user.firstName,

                lastName:user.lastName,

                username:user.username,

                email:user.email

            }

        });

    }

    catch(err){

        res.status(500).json({

            message:err.message

        });

    }

});



export default router;