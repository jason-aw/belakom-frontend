import Vuex from 'vuex'
import Vue from 'vue'
import { auth } from './modules/auth'
import { topic } from './modules/topic'
import { chapter } from './modules/chapter'
import { question } from './modules/question'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		auth, topic, chapter, question
	}
})
