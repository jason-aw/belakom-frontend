import axios from "axios"
import { ApiPath } from './api-path'
import authHeader from "./auth-header"


function createQuestion(question) {

    let questionRec = {
        question: question.question,
        order: question.order,
        chapterId: question.chapterId,
        topicId: question.topicId,
        correctAnswer: question.correctAnswer,
        type: question.questionType,
        fakeAnswers: []
    }

    if (questionRec.type === "MPC") {
        questionRec.fakeAnswers = [question.fakeAnswer1, question.fakeAnswer2, question.fakeAnswer3]
    }

    console.log(questionRec)

    return axios.post(ApiPath.CREATE_QUESTION_URL, questionRec, {headers: authHeader('accessToken')})
        .then(response => Promise.resolve(response))
        .catch(error => Promise.reject(error.response.data))
}

function getAllQuestionByChapterId(chapterId) {

    return axios.get(ApiPath.GET_ALL_QUESTION_BY_CHAPTER_ID+chapterId, {headers: authHeader('accessToken')})
        .then(response => Promise.resolve(response))
        .catch(error => Promise.reject(error.response.data))
}

function getAllQuestionByTopicId(topicId) {

    return axios.get(ApiPath.GET_ALL_QUESTION_BY_TOPIC_ID+topicId, {headers: authHeader('accessToken')})
        .then(response => Promise.resolve(response))
        .catch(error => Promise.reject(error.response.data))
}

export default {
    getAllQuestionByChapterId, getAllQuestionByTopicId, createQuestion
}
