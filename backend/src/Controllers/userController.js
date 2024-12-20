const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')

const registerUser = asyncHandler(async(req,res)=>{
    const {name,email,password, profile} = req.body

    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User Already Exists')
    }

    const user = await User.create({
        name,email,password,profile
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            password: user.password,
            profile: user.profile,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error("Error Occured")
    }
})

const authUser = asyncHandler(async (req,res)=>{
     const {email,password} = req.body

     const user = await User.findOne({email})

     if(user && (await user.matchPassword(password))){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            profile: user.profile,
            token: generateToken(user._id)
        })
     }
     else{
        res.status(400);
        throw new Error('Invalid User')
     }
})

const UpdateProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        // Check if the email is being changed and already exists for another user
        if (req.body.email && req.body.email !== user.email) {
            const emailExists = await User.findOne({ email: req.body.email });
            if (emailExists) {
                res.status(400);
                throw new Error('Email already in use by another account.');
            }
        }

        // Update the fields
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.profile = req.body.profile || user.profile;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            profile: updatedUser.profile,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error('User Not Found');
    }
});


module.exports = {registerUser, authUser, UpdateProfile}
