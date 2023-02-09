const client = require("../db/connection")

class Country {
    constructor({ id, name, capital, population, languages, fun_fact, map_image_url }) {
        this.id = id
        this.name = name
        this.capital = capital
        this.population = population
        this.languages = languages
        this.fun_fact = fun_fact
        this.map_image_url = map_image_url
    }

    static async show(name) {
        try {
            const response = await client.query("SELECT * FROM countries WHERE name = $1;", [name])
            console.log(response.rows[0])
            return new Country(response.rows[0]) 
        } catch (err) {
            return err
        }
    }
}

module.exports = Country
