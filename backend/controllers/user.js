import { User } from "../models/user.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res)=>{
    try {
        const {
            fullname,
            username,
            password,
            confirmPassword,
            gender
        } = req.body;

        if(!fullname || !username || !password || !confirmPassword || !gender){
            return res.status(404).json({
                message: "Some error occured, check all fields",
                success: false
            })
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                message: "Password doesn't match",
                success: false
            })
        }

        const user = await User.findOne({username});

        if(user){
            return res.status(400).json({
                message: "Username not available",
                success: false
            })
        };

        const hashedPassword = await bcrypt.hash(password, 10);

        const maleProfilePicture = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleProfilePicture = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        await User.create({
            fullname: fullname,
            username: username,
            password: hashedPassword,
            profilePicture: gender === "male"? maleProfilePicture: femaleProfilePicture,
            gender: gender
        });

        return res.status(201).json({
            message: "Account created successfully",
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res)=>{
    try {
        const { username, password } = req.body;
        
        if(!username || !password){
            return res.status(404).json({
                message: "Some error occured, check all fields",
                success: false,
            });
        };

        const user = await User.findOne({username});

        if(!user){
            return res.status(400).json({
                message: "User not found",
                success: false,
            });
        };

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if(!isPasswordMatched){
            return res.status(401).json({
                message: "Incorrect password",
                success: false,
            });
        };

        const tokenData = {
            userId: user._id,
        }
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
            expiresIn: '3d'
        });

        return res.status(200).cookie("token", token, {
            maxAge: 3*24*60*60*1000,
            httpOnly: true,
            sameSite: 'strict'
        }).json({
            message: "Logged in successfully",
            success: true,
            userData: {
                _id: user._id,
                username: user.username,
                fullname: user.fullname,
                profilePicture: user.profilePicture
            }
        });

    } catch (error) {
        console.log(error)
    }
}

export const logOut = (req, res)=>{
    try {
        return res.status(200).cookie("token", "",{
            maxAge: 0
        }).json({
            message: "Logged out successfully",
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const getOtherUsers = async (req, res)=>{
    try {
        const loggedInUser = req.id;
        const otherUsers = await User.find({_id: {$ne: loggedInUser}}).select("-password");
        return res.status(200).json({
            otherUsers
        })

    } catch (error) {
        console.log(error)
    }
}