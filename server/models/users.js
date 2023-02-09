const client = require("../db/connection")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

class User {
  constructor({ user_id, user_username, user_password }) {
    this.id = user_id
    this.username = user_username
    this.password = user_password
  }


  static async fundUserByID(id) {
    try {
      const response = await client.query("SELECT * FROM users WHERE id = $1;", [id])
      return response.rows[0]
  } catch (err) {
      return err
  }
  }




  static async findUserByUsername(username) {
    try {
        const response = await client.query("SELECT * FROM users WHERE username = $1;", [username])
        return response.rows[0]
    } catch (err) {
        return err
    }
  }

  static async create({ username, password }) {
    console.log("Model", username, password)
    if (!username || !password) {
      throw new Error("Username and password are required")
    }
    if(await this.findUserByUsername(username)){ 
        throw new Error("Username already taken")
    }
    try {
      const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS))
      console.log(hashedPassword)
      const response = await client.query("INSERT INTO users (username, password) VALUES ($1, $2);", [username, hashedPassword])
      return "User Registered"
    } catch (err) {
      return err
    }
  }







  static async login({ username, password }) {
    if (!username || !password){
        throw new Error("Username and password are required")
    }
    if(!await this.findUserByUsername(username)){ 
        throw new Error("Username already taken")
    }
    try {
        const user = await this.findUserByUsername(username)
        if(!user){
            throw new Error("Incorrect username or password")
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            throw new Error("Incorrect username or password")
        }
        const token = jwt.sign({ sub: user.id}, process.env.SECRET, { expiresIn: "1 day"})
        return token
    } catch (err) {
        return err
    }
  }
}




module.exports = User