const BASE_URL = "http://localhost:8081"

const TOPIC_PATH = BASE_URL + "/api/topic"

const GET_ALL_TOPIC_URL = TOPIC_PATH + "/all"
const DELETE_TOPIC = TOPIC_PATH + "/delete"
const CREATE_TOPIC = TOPIC_PATH + "/create"
const UPDATE_TOPIC = TOPIC_PATH + "/topic"


export const TopicApiPath = {
    GET_ALL_TOPIC_URL, DELETE_TOPIC, CREATE_TOPIC, UPDATE_TOPIC
}
