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



const router = require("./routers/routes")

app.use("/", router);


module.exports = app