import axios from "axios"
import { ApiPath } from "./api-path"

function getAllTopics() {

	return axios.get(ApiPath.GET_ALL_TOPIC_URL)
		.then(response => response)
		.catch(error => error.response.data)
}

function createTopic(topic) {

	let topicReq = {
		topicName: topic.topicName,
		description: topic.description
	}

	return axios.post(ApiPath.CREATE_TOPIC_URL, topicReq)
		.then(response => response)
		.catch(error => error.response.data)
}

function updateTopic(topic) {

	let topicReq = {
		topicId: topic.id,
		topicName: topic.topicName,
		description: topic.description
	}

	return axios.put(ApiPath.UPDATE_TOPIC_URL, topicReq)
		.then(response => response)
		.catch(error => error.response.data)
}

function deleteTopic(id) {

	return axios.put(ApiPath.DELETE_TOPIC_URL, id)
		.then(response => response)
		.catch(error => error.response.data)
}

export default {
	getAllTopics, createTopic, updateTopic, deleteTopic
}


