const BASE_URL = "http://localhost:8081"

const AUTH_PATH = BASE_URL + "/api/auth"

const LOGIN_URL = AUTH_PATH + "/login"
const REGISTER_URL = AUTH_PATH + "/register"
const LOGOUT_URL = AUTH_PATH + "/logout"
const ME_URL = AUTH_PATH + "/user/me"

export const ApiPath = {
  LOGIN_URL, REGISTER_URL, LOGOUT_URL, ME_URL
}