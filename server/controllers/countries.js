const Country = require("../models/countries")

async function getCountry (req, res) {
    const name = req.body.country
    console.log("Controller Country", name)
    try {
        if(!name) {
            throw new Error("Country not defined")
        }
        const country = await Country.show(name)
        res.status(200).json({ success: true, country })
    } catch (err) {
        res.status(404).json({ 
            error: true,
            message: err
        })
    }
}

module.exports = {
    getCountry
}