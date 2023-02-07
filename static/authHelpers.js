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



module.exports = {
    setTokenToLocalStorage,
    getTokenFromLocalStorage,
    removeTokenFromLocalStorage,
    userIsAuthenticated
}