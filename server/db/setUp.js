const fs = require("fs")
const client = require("./connection")

const countriesSchema = fs.readFileSync('./db/countries.sql').toString()
const userSchema = fs.readFileSync('./db/users.sql').toString()
const seedData = fs.readFileSync('./db/seed.sql').toString()

const setUpDB = async () => {
    await client.query(countriesSchema)
    await client.query(userSchema)
    await client.query(seedData)
    console.log("Database ready")
}

setUpDB()