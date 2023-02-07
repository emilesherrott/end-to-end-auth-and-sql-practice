const client = require("./db/connection")
const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cors = require("cors")
const logger = require("./logger")

const app = express()

// MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cors())
app.use(logger)


// ENDPOINTS
app.post("/country/", async (req, res) => {
    const country = req.body.country
    if(!country){
        res.status(400).json({ error: "Please enter a country"})
        return
    }
    try {
        const result = await client.query("SELECT * FROM countries WHERE name = $1;", [country])
        res.send(result.rows)
    } catch (err) {
        res.send(err)
    }
})


app.post("/register", async (req, res) => {
    const { username, password } = req.body
    console.log(username, password)
    if(!username || !password){
        res.status(400).json({ error: "Username and password are required"})
    } try {
        const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS))
        console.log(hashedPassword)
        const response = await client.query("INSERT INTO users (username, password) VALUES ($1, $2);",[username, hashedPassword])
        res.json({ success: true })
    } catch (err) { 
        res.status(500).json({ err })
    }
})






app.post("/login", async (req, res) => {
    const { username, password } = req.body 
    if (!username || !password){
        res.status(400).json({ error: "Username and password are required" })
        return
    }
    try {
        const { rows } = await client.query("SELECT * FROM users WHERE username = $1;", [username])
        const user = rows[0]
        if(!user){
            res.status(401).json({ success: false, message: "Incorrect username or password" })
            return 
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            res.status(401).json({ success: false, message: "Incorrect username or password"})
            return
        }
        const token = jwt.sign({ sub: user.id}, process.env.SECRET, { expiresIn: "1 day"})
        res.json({ success: true, message: "Logged in successfully", token})
    } catch (err) {
        res.status(500).json({ success: false, err })
    }

})




module.exports = app