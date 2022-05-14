import axios from "axios";
import { ApiPath } from "./api-path";
import authHeader from "./auth-header";

function getTopicProgressByUserId() {
    return axios
        .get(ApiPath.GET_TOPIC_PROGRESS_BY_USER_ID, {
            headers: authHeader("accessToken"),
        })
        .then((response) => Promise.resolve(response))
        .catch((error) => Promise.reject(error.response.data));
}

function updateChapterProgress(req) {
    return axios
        .post(ApiPath.UPDATE_CHAPTER_PROGRESS, req, {
            headers: authHeader("accessToken"),
        })
        .then((response) => Promise.resolve(response))
        .catch((error) => Promise.reject(error.response.data));
}

export default {
    updateChapterProgress, getTopicProgressByUserId
}
