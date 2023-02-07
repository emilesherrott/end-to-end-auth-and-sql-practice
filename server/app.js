const client = require("./db/connection")
const express = require("express")
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



module.exports = app