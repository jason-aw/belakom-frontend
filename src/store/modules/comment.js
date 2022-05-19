import commentService from "@/services/comment.service";

export const comment = {
  namespaced: true,
  state: {
    comments: {
      mainComments: [],
      repliesCommentMap: {}
    }
  },
  getters: {
    comments(state) {
      return state.comments;
    }
  },
  actions: {
    async getComments({ commit }, chapterId) {
      try {
        let res = await commentService.getCommentsByChapterId(chapterId);
        delete res.success;
        commit("setComments", res);
        return Promise.resolve(res);
      } catch (error) {
        commit("clearComments")
        return Promise.reject(error);
      }
    },
  },
  mutations: {
    setComments(state, payload) {
      state.comments = payload;
    },
    clearComments(state) {
      state.comments = {
        mainComments: [],
        repliesCommentMap: {}
      }
    }
  }
}