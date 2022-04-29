import axios from "axios"
import { ApiPath } from "./api-path"
import authHeader from "./auth-header";

function getAllChapters(id) {
    console.log(id)
    return axios.get(ApiPath.GET_ALL_CHAPTERS_URL, {headers: authHeader('accessToken'), params: { id: id }})
        .then(response => Promise.resolve(response))
        .catch(error => Promise.reject(error.response.data))
}

function createChapter(chapter) {

    let chapterRec = {
        chapterName: chapter.chapterName,
        order: chapter.order,
        topicId : chapter.topicId,
        description: chapter.description,
    }

    console.log(chapterRec)

    return axios.post(ApiPath.CREATE_CHAPTER_URL, chapterRec, {headers: authHeader('accessToken')})
        .then(response => Promise.resolve(response))
        .catch(error => Promise.reject(error.response.data))
}

function deleteChapter(id) {
    return axios.delete(ApiPath.DELETE_CHAPTER_URL+id, {headers: authHeader('accessToken')})
        .then(response => Promise.resolve(response))
        .catch(error => Promise.reject(error.response.data))
}

export default {
    getAllChapters, createChapter, deleteChapter
}
