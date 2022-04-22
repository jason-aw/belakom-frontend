const API_BASE_URL = "http://localhost:8080"

// AUTH CONTROLLER
const AUTH_PATH = API_BASE_URL + "/api/auth"

const LOGIN_URL = AUTH_PATH + "/login"
const REGISTER_URL = AUTH_PATH + "/register"
const LOGOUT_URL = AUTH_PATH + "/logout"
const ME_URL = AUTH_PATH + "/user/me"
const REFRESH_TOKEN_URL = AUTH_PATH + "/refreshToken"

const GOOGLE_AUTH_URL = API_BASE_URL + "/oauth2/authorize/google?redirect_uri=http://localhost:8081/oauth2/redirect"

// TOPIC CONTROLLER
const TOPIC_PATH = API_BASE_URL + "/api/topic"

const GET_ALL_TOPIC_URL = TOPIC_PATH + "/all"
const DELETE_TOPIC_URL = TOPIC_PATH + "/delete/"
const CREATE_TOPIC_URL = TOPIC_PATH + "/create"
const UPDATE_TOPIC_URL = TOPIC_PATH + "/topic"

export const ApiPath = {
  LOGIN_URL, REGISTER_URL, LOGOUT_URL, ME_URL, GOOGLE_AUTH_URL, REFRESH_TOKEN_URL,
  GET_ALL_TOPIC_URL, DELETE_TOPIC_URL, CREATE_TOPIC_URL, UPDATE_TOPIC_URL
}
