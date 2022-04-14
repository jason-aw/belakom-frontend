const API_BASE_URL = "http://localhost:8080"

const AUTH_PATH = API_BASE_URL + "/api/auth"

const LOGIN_URL = AUTH_PATH + "/login"
const REGISTER_URL = AUTH_PATH + "/register"
const LOGOUT_URL = AUTH_PATH + "/logout"
const ME_URL = AUTH_PATH + "/user/me"

const GOOGLE_AUTH_URL = "http://localhost:8080/oauth2/authorize/google?redirect_uri=http://localhost:8081/oauth2/redirect"

export const ApiPath = {
  LOGIN_URL, REGISTER_URL, LOGOUT_URL, ME_URL, GOOGLE_AUTH_URL
}