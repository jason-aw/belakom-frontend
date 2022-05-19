import chapterService from "@/services/chapter.service";

export const chapter = {
  namespaced: true,
  state: {
    chapters: [],
    chapterDetail: {
      chapterName: "",
      description: "",
      htmlContent: "",
      topicId: "",
      id: "",
      questions: [{}],
    },
  },
  getters: {
    chapters(state) {
      return state.chapters;
    },
    chapterDetail(state) {
      return state.chapterDetail;
    },
  },
  actions: {
    getAllChapters({ commit }, payLoad) {
      return chapterService.getAllChapters(payLoad.topicId).then(
        (response) => {
          commit("getAllChaptersSuccess", response.data.value);
          return Promise.resolve(response);
        },
        (error) => {
          commit("clearAllChapters");
          return Promise.reject(error);
        }
      );
    },
    getChapterDetailById({ commit }, chapterId) {
      return chapterService
        .getChapterById(chapterId)
        .then((response) => {
          delete response.success;
          commit("setChapterDetail", response);
          return Promise.resolve(response);
        })
        .catch((error) => {
          commit("clearChapterDetail");
          if (!error) {
            console.log("Network Error")
            return Promise.reject("Network Error");
          }
          return Promise.reject(error);
        });
    },
    clearChapterData({ commit }) {
      commit("clearChapterDetail");
      commit("clearAllChapters");
    },
  },
  mutations: {
    getAllChaptersSuccess(state, chapters) {
      state.chapters = chapters;
    },
    clearAllChapters(state) {
      state.chapters = [];
    },
    setChapters(state, chapters) {
      state.chapters = chapters;
    },
    setChapterDetail(state, chapterDetail) {
      state.chapterDetail = chapterDetail;
    },
    clearChapterDetail(state) {
      state.chapterDetail = {};
    },
    updateEnableQuiz(state, value) {
      state.chapterDetail.enableQuiz = value;
    },
    addQuestion(state) {
      state.chapterDetail.questions.push({
        questionPrompt: "Question...",
        questionType: "MULTIPLE_CHOICE",
        answers: [{
          answer: "Option 1",
          correct: false,
        }],
      });
    },
    updateQuestion(state, payload) {
      let question = state.chapterDetail.questions[payload.questionIndex];
      question.questionPrompt = payload.questionPrompt;
      question.questionType = payload.questionType;
      if (payload.questionType === "SHORT_ANSWER") {
        question.answers = [
          { answer: "Correct Answer 1", correct: true }
        ];
      } else {
        question.answers = [
          { answer: "Option 1", correct: false, }
        ];
      }
    },
    removeQuestion(state, questionIndex) {
      state.chapterDetail.questions.splice(questionIndex, 1);
    },
    addAnswer(state, payload) {
      const answers = state.chapterDetail.questions[payload.questionIndex].answers;
      let answer = {};
      if (payload.questionType === "SHORT_ANSWER") {
        answer = {
          answer: "Correct Answer " + (answers.length + 1),
          correct: true,
        };
      } else {
        answer = {
          answer: "Option " + (answers.length + 1),
          correct: false,
        };
      }
      answers.push(answer);
    },
    updateAnswer(state, payload) {
      const answer = state.chapterDetail.questions[payload.questionIndex]
        .answers[payload.answerIndex];

      answer.correct = payload.correct;
      answer.answer = payload.answer;
    },
    removeAnswer(state, payload) {
      const question = state.chapterDetail.questions[payload.questionIndex];
      question.answers.splice(payload.answerIndex, 1);
    },
  },
};
