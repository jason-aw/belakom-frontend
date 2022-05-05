const API_BASE_URL = "http://localhost:8080"

// AUTH CONTROLLER
const AUTH_PATH = API_BASE_URL + "/api/auth"

const LOGIN_URL = AUTH_PATH + "/login"
const REGISTER_URL = AUTH_PATH + "/register"
const LOGOUT_URL = AUTH_PATH + "/logout"
const REFRESH_TOKEN_URL = AUTH_PATH + "/refreshToken"

const GOOGLE_AUTH_URL = API_BASE_URL + "/oauth2/authorize/google?redirect_uri=http://localhost:8081/oauth2/redirect"

// TOPIC CONTROLLER
const TOPIC_PATH_URL = API_BASE_URL + "/api/topic"

const GET_ALL_TOPIC_URL = TOPIC_PATH_URL + "/all"
const DELETE_TOPIC_URL = TOPIC_PATH_URL + "/delete/"
const CREATE_TOPIC_URL = TOPIC_PATH_URL + "/create"
const UPDATE_TOPIC_URL = TOPIC_PATH_URL + "/update"

// CHAPTER CONTROLLER

const CHAPTER_PATH_URL = API_BASE_URL + "/api/chapter"

const GET_ALL_CHAPTERS_URL = CHAPTER_PATH_URL + "/getAllByTopicId"
const DELETE_CHAPTER_URL = CHAPTER_PATH_URL + "/delete/"
const CREATE_CHAPTER_URL = CHAPTER_PATH_URL + "/create"
const UPDATE_CHAPTER_URL = CHAPTER_PATH_URL + "/update"
const GET_CHAPTER_BY_ID_URL = CHAPTER_PATH_URL + "/"

// FILES CONTROLLER
const FILES_PATH_URL = API_BASE_URL + "/api/files"

const UPLOAD_FILE_URL = FILES_PATH_URL + "/upload"
const DELETE_FILE_URL = API_BASE_URL + "/"

// QUESTION CONTROLLER
const QUESTION_PATH_URL = API_BASE_URL + "/api/question"

const GET_ALL_QUESTION_BY_CHAPTER_ID = QUESTION_PATH_URL + "/bychapter/"
const GET_ALL_QUESTION_BY_TOPIC_ID = QUESTION_PATH_URL + "/bytopic/"
const CREATE_QUESTION_URL = QUESTION_PATH_URL + "/create"


export const ApiPath = {
  LOGIN_URL, REGISTER_URL, LOGOUT_URL, GOOGLE_AUTH_URL, REFRESH_TOKEN_URL,
  GET_ALL_TOPIC_URL, DELETE_TOPIC_URL, CREATE_TOPIC_URL, UPDATE_TOPIC_URL, TOPIC_PATH_URL,
  GET_ALL_CHAPTERS_URL, CREATE_CHAPTER_URL, DELETE_CHAPTER_URL, UPDATE_CHAPTER_URL, GET_CHAPTER_BY_ID_URL,
  UPLOAD_FILE_URL, DELETE_FILE_URL,
  GET_ALL_QUESTION_BY_CHAPTER_ID, GET_ALL_QUESTION_BY_TOPIC_ID, CREATE_QUESTION_URL
}
