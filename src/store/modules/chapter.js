import chapterService from '@/services/chapter.service';

export const chapter = {
    namespaced: true,
    state: {
        chapters: []
    },
    getters: {
        chapters(state) {
            return state.chapters
        },
    },
    actions: {
        getAllChapters({commit}, payLoad) {
            return chapterService.getAllChapters(payLoad.topicId)
                .then(response => {
                        console.log("chapter put into state")
                        commit('getAllChaptersSuccess', response.data)
                        return Promise.resolve(response)
                    },
                    error => {
                        commit('getAllChaptersError')
                        return Promise.resolve(error)
                    })
        },
    },
    mutations: {
        getAllChaptersSuccess(state, chapters) {
            state.chapters = chapters
        },
        getAllChaptersError(state) {
            state.chapters = []
        }
    }
}
