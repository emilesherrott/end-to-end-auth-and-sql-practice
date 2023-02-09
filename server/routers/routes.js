const { Router } = require("express")

const { getCountry } = require("../controllers/countries")
const { registerUser, loginUser } = require("../controllers/users")
const secureRoute = require('../routers/secureRoute')

const router = Router()

router.post("/country", secureRoute, getCountry)

router.post("/register", registerUser)
router.post("/login", loginUser)


module.exports = router