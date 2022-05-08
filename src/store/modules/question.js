import questionService from "@/services/question.service";

export const question = {
  namespaced: true,
  state: {
    questions: [],
    questionDetail: {},
  },
  getters: {
    questions(state) {
      return state.questions;
    },
    questionDetail(state) {
      return state.questionDetail;
    },
  },
  actions: {
    getQuestionsByChapterId({ commit }, chapterId) {
      return questionService.getAllQuestionByChapterId(chapterId).then(
        (response) => {
          commit("getAllQuestionSuccess", response.data);
          return Promise.resolve(response);
        },
        (error) => {
          commit("getAllQuestionError");
          return Promise.resolve(error);
        }
      );
    },
  },
  mutations: {
    getAllQuestionSuccess(state, questions) {
      state.questions = questions;
    },
    getAllQuestionError(state) {
      state.questions = [];
    },
  },
};
