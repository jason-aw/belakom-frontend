import axios from "axios";
import { ApiPath } from "./api-path";
import authHeader from "./auth-header";

function getCurrentUserDetail() {
    return axios.get(ApiPath.GET_CURRENT_USER_DETAIL, { headers: authHeader("accessToken") })
        .then((response) => Promise.resolve(response))
        .catch((error) => Promise.reject(error.response.data));
}

function updateCurrentlyLearningTopic(topicId) {
    return axios
        .post(ApiPath.UPDATE_CURRENT_LEARNING_TOPIC+topicId, { headers: authHeader("accessToken") })
        .then((response) => Promise.resolve(response))
        .catch((error) => Promise.reject(error.response.data));
}

export default {
    updateCurrentlyLearningTopic, getCurrentUserDetail
};
