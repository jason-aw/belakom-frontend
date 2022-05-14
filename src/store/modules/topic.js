import topicService from "@/services/topic.service";

export const topic = {
  namespaced: true,
  state: {
    topicData: [],
    topicDetail: {},
  },
  getters: {
    topicData(state) {
      return state.topicData;
    },
    topicDetail(state) {
      return state.topicDetail;
    },
  },
  actions: {
    getAllTopics({ commit }) {
      return topicService.getAllTopics().then(
        (response) => {
          commit("getAllTopicSuccess", response.data.topicData);
          return Promise.resolve(response);
        },
        (error) => {
          commit("getAllTopicError");
          return Promise.resolve(error);
        }
      );
    },
    getTopicByName({ commit }, payLoad) {
      return topicService.getTopicByName(payLoad.topicName).then(
        (response) => {
          commit("getTopicDetailSuccess", response.data);
          return Promise.resolve(response);
        },
        (error) => {
          commit("getTopicDetailError");
          return Promise.resolve(error);
        }
      );
    },
  },
  mutations: {
    getAllTopicSuccess(state, topics) {
      state.topicData = topics;
    },
    getAllTopicError(state) {
      state.topicData = [];
    },
    getTopicDetailSuccess(state, topic) {
      state.topicDetail = topic;
    },
    getTopicDetailError(state) {
      state.topicDetail = {};
    },
    clearTopicDetail(state) {
      state.topicDetail = {};
    },
  },
};
