const express = require("express")
const UserModel = require('../models/User')

const routes = express.Router()

//http://localhost:8089/api/vi/user/signup
// 1. Allow user to create new account
routes.post("/signup", async (req, res) => {
    try {
        const newUser = new UserModel({
            ...req.body
        })
        await newUser.save()
        res.status(201).send(newUser)
    } catch (error) { //
        res.status(500).send(error)
    }
})

//http://localhost:8089/api/vi/user/login
// 2. Allow user to access the system
routes.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body
        //check if valid username/ email
        const validateUser = await UserModel.findOne({
            $or: [{ username: username }, { email: username }],
            password: password
        })
        if (validateUser) {
            res.json({
                status: true,
                username: validateUser.username,
                message: "User logged in successfully"
            })
        } else {
            res.status(401).json({
                status: false,
                message: "Invalid Username and password"
            })
        }
    } catch (error) { //
        res.status(500).send(error)
    }
})

module.exports = routes