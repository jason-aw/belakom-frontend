import axios from "axios";
import { ApiPath } from "./api-path";
import authHeader from "./auth-header";

function getAllTopics() {
  return axios
    .get(ApiPath.GET_ALL_TOPIC_URL, {"Access-Control-Allow-Origin": "*"})
    .then((response) => Promise.resolve(response))
    .catch((error) => Promise.reject(error.response.data));
}

function getAllTopicsByUserId() {
  return axios
    .get(ApiPath.GET_ALL_TOPIC_BY_USERID_URL, { headers: authHeader("accessToken") })
    .then((response) => Promise.resolve(response))
    .catch((error) => Promise.reject(error.response.data));
}

function createTopic(topic) {
  let topicReq = {
    topicName: topic.topicName,
    description: topic.description,
  };

  return axios
    .post(ApiPath.CREATE_TOPIC_URL, topicReq, {
      headers: authHeader("accessToken"),
    })
    .then((response) => Promise.resolve(response))
    .catch((error) => Promise.reject(error.response.data));
}

function updateTopic(topic) {
  let topicReq = {
    id: topic.id,
    topicName: topic.topicName,
    description: topic.description,
  };

  return axios
    .put(ApiPath.UPDATE_TOPIC_URL, topicReq, {
      headers: authHeader("accessToken"),
    })
    .then((response) => Promise.resolve(response))
    .catch((error) => Promise.reject(error.response.data));
}

function updateTopicChapterOrder(chapters) {
  let chapterOrder = [];
  chapters.forEach((chapter) => chapterOrder.push(chapter.id));

  let updateChapterOrderReq = {
    chapterOrder: chapterOrder,
    topicId: chapters[0].topicId,
  };

  return axios
    .post(ApiPath.UPDATE_TOPIC_CHAPTER_ORDER, updateChapterOrderReq, {
      headers: authHeader("accessToken"),
    })
    .then((response) => Promise.resolve(response))
    .catch((error) => Promise.reject(error.response.data));
}

function getTopicByName(topicName) {
  return axios
    .get(ApiPath.TOPIC_PATH_URL + "/" + topicName, {
      headers: authHeader("accessToken"),
    })
    .then((response) => Promise.resolve(response))
    .catch((error) => Promise.reject(error.response.data));
}

function deleteTopic(id) {
  return axios
    .delete(ApiPath.DELETE_TOPIC_URL + id, {
      headers: authHeader("accessToken"),
    })
    .then((response) => Promise.resolve(response))
    .catch((error) => Promise.reject(error.response.data));
}

export default {
  getAllTopics,
  getAllTopicsByUserId,
  createTopic,
  updateTopic,
  deleteTopic,
  getTopicByName,
  updateTopicChapterOrder,
};
