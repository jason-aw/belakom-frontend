import axios from "axios";
import { ApiPath } from "./api-path";
import authHeader from "./auth-header";

function getCommentsByChapterId(chapterId) {
  return axios.get(ApiPath.COMMENT_PATH_URL + chapterId)
    .then(response => Promise.resolve(response.data.value))
    .catch(error => Promise.reject(error));
}

function deleteComment(id) {
  return axios.delete(ApiPath.COMMENT_PATH_URL + id, { headers: authHeader("accessToken") })
    .then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error));;
}

function createComment(request) {
  return axios.post(ApiPath.COMMENT_PATH_URL, request, { headers: authHeader("accessToken") })
    .then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error));;
}

function editComment(request) {
  return axios.put(ApiPath.COMMENT_PATH_URL, request, { headers: authHeader("accessToken") })
    .then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error));;
}

export default {
  getCommentsByChapterId, deleteComment, createComment, editComment
}
