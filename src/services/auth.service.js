import axios from "axios"
import { ApiPath } from "@/services/apipath"

function login(user) {
  let req = {
    email: user.email,
    password: user.password
  }

  return axios.post(ApiPath.LOGIN_URL, req)
    .then(handleResponse)
    .then(response => {
      if (response.data.accessToken) {
        console.log(response.data)
        localStorage.setItem('user', JSON.stringify(response.data))
      }
      return response.data
    })
}

function logout() {
  let user = JSON.parse(localStorage.getItem('user'))
  let req = {
    accessToken: user.accessToken,
    refreshToken: user.refreshToken
  }
  axios.post(ApiPath.LOGOUT_URL, req)
    .then(response => {
      console.log("Logout Success", response)
      localStorage.removeItem('user')
    }, error => {
      console.log("Logout Error", error)
    })
}

function register(user) {
  let req = {
    email: user.email,
    password: user.password
  }

  return axios.post(ApiPath.REGISTER_URL, req)
    .then(handleResponse)
    .then(response => {
      console.log(response)
    })
}

function handleResponse(response) {
  if (response.status === 401) {
    this.logout()
    location.reload(true)

    const error = response.data && response.data.message
    return Promise.reject(error)
  }

  return Promise.resolve(response)
}

export default {
  login, logout, register
}