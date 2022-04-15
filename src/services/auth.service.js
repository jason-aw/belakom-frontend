import axios from "axios"
import { ApiPath } from "@/services/apipath"
import store from "@/store"
import authHeader from "./auth-header"

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
        let { accessToken, refreshToken } = response.data
        return { accessToken, refreshToken }
      }
      return response.data
    }).catch(function (error) {
      return Promise.reject(error.response.data)
    })
}

function logout() {
  let user = store.state.auth.user
  let req = {
    accessToken: user.accessToken,
    refreshToken: user.refreshToken
  }
  axios.post(ApiPath.LOGOUT_URL, req)
    .then(response => {
      console.log("Logout Success", response)
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
    .catch(function (error) {
      return Promise.reject(error.response.data)
    })
}

function refreshToken() {
  return axios.get(ApiPath.REFRESH_TOKEN_URL, { headers: authHeader('refreshToken') })
    .then(handleResponse)
    .then(response => {
      if (response.data.accessToken) {
        console.log("token refreshed", response.data)
        let { accessToken, refreshToken } = response.data
        return { accessToken, refreshToken }
      }
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
  login, logout, register, refreshToken
}
