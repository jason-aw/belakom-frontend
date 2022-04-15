import axios from "axios"
import { ApiPath } from "./api-path"
import store from "@/store"
import authHeader from "./auth-header"

function login(user) {
  let req = {
    email: user.email,
    password: user.password
  }

  return axios.post(ApiPath.LOGIN_URL, req)
    .then(response => {
      console.log(response.data)
      let { accessToken, refreshToken } = response.data
      return Promise.resolve({ accessToken, refreshToken })
    })
    .catch(error => Promise.reject(error.response.data))
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
      return Promise.resolve(response)
    })
    .catch(error => {
      console.log("Logout Error", error)
      return Promise.reject(error)
    })
}

function register(user) {
  let req = {
    email: user.email,
    password: user.password
  }
  return axios.post(ApiPath.REGISTER_URL, req)
    .then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error.response.data))
}

function refreshToken() {
  return axios.get(ApiPath.REFRESH_TOKEN_URL, { headers: authHeader('refreshToken') })
    .then(response => {
      console.log("token refreshed", response.data)
      let { accessToken, refreshToken } = response.data
      return Promise.resolve({ accessToken, refreshToken })
    })
    .catch(error => {
      console.log("token refresh fail", error)
      return Promise.reject(error)
    })
}

export default {
  login, logout, register, refreshToken
}
