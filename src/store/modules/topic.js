import topicService from '@/services/topic.service';

export const topic = {
    namespaced: true,
    state: {
        topicData: []
    },
    getters: {
        topicData(state) {
            return state.topicData
        }
    },
    actions: {
        getAllTopics({commit}) {
            return topicService.getAllTopics().then(
                response => {
                    console.log("topic put into state")
                    commit('getAllTopicSuccess', response.data)
                    return Promise.resolve(response)
                },
                error => {
                    commit('getAllTopicError')
                    return Promise.resolve(error)
                }
            )
        }
    },
    mutations: {
        getAllTopicSuccess(state, topics) {
            state.topicData = topics
        },
        getAllTopicError(state){
            state.topicData = []
        }
    },
}
