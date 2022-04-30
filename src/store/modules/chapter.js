import chapterService from '@/services/chapter.service';

export const chapter = {
	namespaced: true,
	state: {
		chapters: [],
		chapterDetail: {
			chapterName: "",
			description: "",
			htmlContent: "",
			id: "",
			order: null,
		}
	},
	getters: {
		chapters(state) {
			return state.chapters
		},
		chapterDetail(state) {
			return state.chapterDetail
		}
	},
	actions: {
		getAllChapters({ commit }, payLoad) {
			return chapterService.getAllChapters(payLoad.topicId)
				.then(response => {
					commit('getAllChaptersSuccess', response.data)
					return Promise.resolve(response)
				},
					error => {
						commit('clearAllChapters')
						return Promise.resolve(error)
					})
		},
		getChapterDetailById({ commit }, chapterId) {
			return chapterService.getChapterById(chapterId)
				.then(response => {
					delete response.success
					commit('setChapterDetail', response)
					return Promise.resolve(response)
				})
				.catch(error => {
					commit('clearChapterDetail')
					return Promise.resolve(error)
				})
		},
		clearChapterData({ commit }) {
			commit('clearChapterDetail')
			commit('clearAllChapters')
		},
	},
	mutations: {
		getAllChaptersSuccess(state, chapters) {
			state.chapters = chapters
		},
		clearAllChapters(state) {
			state.chapters = []
		},
		setChapterDetail(state, chapterDetail) {
			state.chapterDetail = chapterDetail
		},
		clearChapterDetail(state) {
			state.chapterDetail = {}
		}
	}
}
