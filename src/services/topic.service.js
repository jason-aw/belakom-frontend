import axios from "axios"
import { TopicApiPath } from "@/services/topicapipath"

function getAllTopics() {

    return axios.get(TopicApiPath.GET_ALL_TOPIC_URL)
        .then(handleResponse)
        .catch(function (error) {
            return Promise.reject(error.response.data)
        })
}

function createTopic(topic) {

    let topicRec = {
        topicName: topic.topicName,
        description: topic.description
    }

    return axios.post(TopicApiPath.CREATE_TOPIC, topicRec)
        .then(handleResponse)
        .catch(function (error) {
            return Promise.reject(error.response.data)
        })
}

function updateTopic(topic) {

    let topicRec = {
        topicId: topic.id,
        topicName: topic.topicName,
        description: topic.description
    }

    return axios.put(TopicApiPath.UPDATE_TOPIC, topicRec)
        .then(handleResponse)
        .catch(function (error) {
            return Promise.reject(error.response.data)
        })
}

function deleteTopic(id) {

    return axios.put(TopicApiPath.UPDATE_TOPIC, id)
        .then(handleResponse)
        .catch(function (error) {
            return Promise.reject(error.response.data)
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
    getAllTopics, createTopic, updateTopic, deleteTopic
}


