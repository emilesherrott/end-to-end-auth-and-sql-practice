const countryForm = document.querySelector("#country-form")

countryForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const userInput = document.querySelector("#country-input").value

    const getData = async () => {
        try {
            let { data } = await axios.post("http://localhost:3000/country", { country: userInput })
            data = data[0]
            if(data){
                displayCountryInfo(data)
            } else {
                displayError(`Could not find information about ${userInput}`)
            }
        } catch (err) {
            displayError(err)
        }
    }
    getData()
})


function displayCountryInfo(info) {
    document.getElementById("country-info").innerHTML = `
        <p>Capital: ${info.capital}</p>
        <p>Official languages: ${info.languages}</p>
        <p>Population: ${info.population}</p>
      `
  
    const mapImg = document.createElement("img")
    mapImg.src = info.map_image_url
    mapImg.id = "map-image"
    document.getElementById("country-info").appendChild(mapImg)
  
    document.getElementById("fun-fact").innerHTML = `
          <p>Fun fact: ${info.fun_fact}</p>
        `
  }
  
  function displayError(error) {
    // Insert the error message into the #country-info div
    document.getElementById("country-info").innerHTML = `
        <p>Error: ${error}</p>
      `
  
    // Clear the #fun-fact div
    // document.getElementById("fun-fact").innerHTML = “”
  }