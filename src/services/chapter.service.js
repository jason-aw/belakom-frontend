import axios from "axios";
import { ApiPath } from "./api-path";
import authHeader from "./auth-header";

function getAllChapters(topicId) {
  return axios
    .get(ApiPath.GET_ALL_CHAPTERS_URL, {
      params: { topicId: topicId },
    })
    .then((response) => Promise.resolve(response))
    .catch((error) => Promise.reject(error.response.data));
}

function getAllChaptersByUserId(topicId) {
  return axios
    .get(ApiPath.GET_ALL_CHAPTERS_BY_USERID_URL, {
      headers: authHeader("accessToken"),
      params: { topicId: topicId },
    })
    .then((response) => Promise.resolve(response))
    .catch((error) => Promise.reject(error.response.data));
}

function createChapter(chapter) {
  let chapterReq = {
    chapterName: chapter.chapterName,
    topicId: chapter.topicId,
    description: chapter.description,
    enableQuiz: chapter.enableQuiz,
  };

  return axios
    .post(ApiPath.CREATE_CHAPTER_URL, chapterReq, {
      headers: authHeader("accessToken"),
    })
    .then((response) => Promise.resolve(response))
    .catch((error) => Promise.reject(error.response.data));
}

function deleteChapter(id) {
  return axios
    .delete(ApiPath.DELETE_CHAPTER_URL + id, {
      headers: authHeader("accessToken"),
    })
    .then((response) => Promise.resolve(response))
    .catch((error) => Promise.reject(error.response.data));
}

function getChapterById(id) {
  let path = ApiPath.GET_CHAPTER_BY_ID_URL + id;
  return axios
    .get(path)
    .then((response) => Promise.resolve(response.data.value))
    .catch((error) => Promise.reject(error.response.data));
}

function updateChapter(chapter) {
  return axios
    .put(ApiPath.UPDATE_CHAPTER_URL, chapter, {
      headers: authHeader("accessToken"),
    })
    .then((response) => Promise.resolve(response.data.value))
    .catch((error) => Promise.reject(error.response.data));
}

export default {
  getAllChapters,
  getAllChaptersByUserId,
  createChapter,
  deleteChapter,
  getChapterById,
  updateChapter,
};
