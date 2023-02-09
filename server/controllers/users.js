const User = require("../models/users")

async function registerUser (req, res) {
    const body = req.body
    try {
        if(["username", "password"].every(key => Object.hasOwn(body, key))) {

            const user = await User.create(body)
            console.log(user)
            res.status(201).json({ message: "User registered" })
        } else {
            throw new Error("Invalid properties")
        }
    } catch (err) {
        res.status(404).json({
            error: true,
            message: err.message
        })
    }
}

async function loginUser (req, res) {
    const body = req.body
    try {
        if(["username", "password"].every(key => Object.hasOwn(body, key))) {

            const token = await User.login(body)
            console.log(token)
            res.status(200).json({ message: "User logged in", token: token })
        } else {
            throw new Error("Invalid properties")
        }
    } catch (err) {
        res.status(404).json({
            error: true,
            message: err.message
        })
    }
}



module.exports = {
    registerUser,
    loginUser
}