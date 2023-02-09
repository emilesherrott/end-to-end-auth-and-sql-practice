const setTokenToLocalStorage = (token) => {
    window.localStorage.setItem("token", token)
}

const getTokenFromLocalStorage = () => {
    return window.localStorage.getItem("token")
  }
  
  const removeTokenFromLocalStorage = () => {
    window.localStorage.removeItem("token")
  }
  

  const getPayload = () => {
    const token = getTokenFromLocalStorage()
    if(!token) return false
    const parts = token.split(".")
    if (parts.length < 3) return false
    return JSON.parse(atob(parts[1]))
  }

  const userIsAuthenticated = () => {
    const payload = getPayLoad()
    if (!payload) return false
    const now = Math.round(Date.now() / 1000)
    return now < payload.exp
  }





const countryForm = document.querySelector("#country-form")

countryForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const userInput = document.querySelector("#country-input").value

  const getData = async () => {
    try {
      let { data } = await axios.post("http://localhost:3000/country", { country: userInput }, {
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}`}
      })
      data = data[0]
      if (data) {
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

const registerForm = document.querySelector("#auth-form-register")
registerForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const userData = {
    username: document.querySelector("#username-input-register").value,
    password: document.querySelector("#password-input-register").value,
  }

  const sendRegistration = async () => {
    try {
      const data = await axios.post("http://localhost:3000/register", userData)
      document.querySelector("#username-input-register").value = ""
      document.querySelector("#password-input-register").value = ""
    } catch (err) {
      console.log(err)
    }
  }
  sendRegistration()
})




const logIn = document.querySelector("#auth-form-login")
logIn.addEventListener("submit", (e) => {
  e.preventDefault()
  const userData = {
    username: document.querySelector("#username-input-login").value,
    password: document.querySelector("#password-input-login").value,
  }
  console.log(userData)
  const sendLogIn = async () => {
    try {
        const { data } = await axios.post("http://localhost:3000/login", userData)
        setTokenToLocalStorage(data.token)
        console.log(data)
    } catch (err) {
        console.log(err)
    }
  }
  sendLogIn()
})


const logOut = document.querySelector("#auth-form-logout")
logOut.addEventListener("submit", (e) => {
    e.preventDefault()
    removeTokenFromLocalStorage()
  })