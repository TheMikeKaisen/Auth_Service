
const { response } = require('express');
const UserService = require('../services/user-service');
const AppErrors = require('../utils/error-handler');
const { sign } = require('jsonwebtoken');

const userService = new UserService();

const create = async (req, res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            success: true,
            message: 'Successfully created a new user',
            data: response,
            err: {}
        });
    } catch (error) {
        // console.log(error);
        return res.status(error.statusCode || 500 ).json({
            message: error.message,
            data: {},
            success: false,
            err: error.explanation
        });
    }
}

const signIn = async(req, res) => {
    try{
        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(200).json({
            success: true,
            message: 'Successfully signed in',
            data: response,
            err: {}
        });
    }
    catch (error) {
        console.log(error);
        return res.status(error.statusCode  || 500).json({
            message: error.message,
            data: {},
            success: false,
            err: error.explanation
        });
    }
}

const isAuthenticated = async (req, res) => {
    try{
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            success: true, 
            err: {}, 
            data: response,
            message: 'user is authenticated and token is valid'
        })
    }
    catch(error) {
        console.log(error);
        return res.status(error.statusCode || 500).json({
            message: error.message,
            data: {},
            success: false,
            err: error
        });
    }
}

const isAdmin = async(req, res) => {
    try {
        const response = await userService.isAdmin(req.body.userId);
        return res.status(200).json({
            data: response,
            err: {}, 
            success: true, 
            message: 'Success'
        })
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode || 500).json({
            message: error.message || "Something went wrong",
            data: {},
            success: false,
            err: error
        });
    }
}

module.exports = {
    create,
    signIn,
    isAuthenticated,
    isAdmin
}