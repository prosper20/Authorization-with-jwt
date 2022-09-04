const { isValidObjectId } = require('mongoose');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SEC, { expiresIn: '1d'});
};

//sign in / authenticate a new user
module.exports.auth = async function auth (req, res, next){
    try {
        const { email, password } =req.body;
         //validate user input
        if (!email || !password) throw createError(400, 'all fields must be filled');

        const user = await User.login(email, password);
        
        //create token
        const token = createToken(user._id);
        
        res.status(201).json({ email, token })

    } catch (error) { 
        next(error);
    }
};

//signup a new user
module.exports.register = async function register (req, res, next){
    try {
        const { email, password } =req.body;
         //validate user input
        if (!email || !password) throw createError(400, 'all fields must be filled');

        const user = await User.signup(email, password);
        
        //create token
        const token = createToken(user._id);
        
        res.status(201).json({ email, token })

    } catch (error) { 
        next(error);
    }
};
/*
module.exports.fetchAllUsers = async function fetchAllUsers (req, res, next){
    try {

        const users = await User.find();
        res.status(201).json(users)

    } catch (error) {
        next(error);
    }
};

module.exports.fetchUserWithId = async function fetchUserWithId (req, res, next){
    try {
        if (!isValidObjectId(req.params.id)) throw createError(400, 'invalid user Id');
        let user = await User.findById(req.params.id);
        if (!user) throw createError(404, 'user not found');

        user = await User.findById(req.params.id);
        res.status(201).json(user)

    } catch (error) {
        next(error);
    }
};  */

module.exports.updateUserWithId = async function updateUserWithId (req, res, next){
    try {

        if (!isValidObjectId(req.params.id)) throw createError(400, 'invalid user ID');
        let user = await User.findById(req.params.id);
        if (!user) throw createError(404, 'user not found');
        
        user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        res.status(201).json(user);

    } catch (error) {
        next(error);
    }
};

module.exports.deleteUserWithId = async function deleteUserWithId (req, res, next){
    try {

        if (!isValidObjectId(req.params.id)) throw createError(400, 'invalid user Id');
        let user = await User.findById(req.params.id);
        if (!user) throw createError(404, 'user not found');

        user = await User.findByIdAndDelete(req.params.id);

        res.status(201).json(user);

    } catch (error) {
        next(error);
    }
};