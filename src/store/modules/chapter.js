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
					console.log("chapter put into state")
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
					console.log("load chapter detail in state")
					delete response.success
					commit('setChapterDetail', response)
					return Promise.resolve(response)
				})
				.catch(error => {
					console.log("get chapter failed")
					commit('clearChapterDetail')
					return Promise.resolve(error)
				})
		},
		clearChapterData({ commit }) {
			commit('clearChapterDetail')
			commit('clearAllChapters')
		},
		// updateChapter(chapter) {
		// 	return chapterService.updateChapter(chapter)
		// 		.then(response => {
		// 			return Promise.resolve(response)
		// 		})
		// 		.catch(error => {
		// 			return Promise.reject(error)
		// 		})
		// }
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
