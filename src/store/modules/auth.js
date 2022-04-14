import authService from '@/services/auth.service';

const user = JSON.parse(localStorage.getItem('user'))
const initialState = user
	? { status: { loggedIn: true }, user }
	: { status: {}, user: null }

export const auth = {
	namespaced: true,
	state: initialState,
	actions: {
		login({ commit }, user) {
			return authService.login(user).then(
				user => {
					commit('loginSuccess', user)
					return Promise.resolve(user)
				},
				error => {
					commit('loginFailure')
					return Promise.reject(error)
				}
			)
		},
		logout({ commit }) {
			authService.logout()
			commit('logout')
		},
		register({ commit }, user) {
			return authService.register(user).then(
				response => {
					commit('registerSuccess')
					console.log("run ke2")
					console.log(response.data)
					return Promise.resolve(response.data)
				},
				error => {
					commit('registerFailure')
					return Promise.reject(error)
				}
			)
		},
		googleLogin({ commit }, user) {
			commit('loginSuccess', user)
		},
		refreshToken({ commit }) {
			authService.refreshToken().then(
				response => {
					commit('refreshToken', response)
					return Promise.resolve(response)
				},
				error => {
					commit('logout')
					return Promise.reject(error)
				}
			)
		}
	},
	mutations: {
		loginSuccess(state, user) {
			state.status = { loggedIn: true }
			state.user = user
			localStorage.setItem('user', JSON.stringify(user))
		},
		loginFailure(state) {
			state.status = {}
			state.user = null
		},
		logout(state) {
			state.status = {}
			state.user = null
			localStorage.removeItem('user')
		},
		registerSuccess(state) {
			state.status = {}
		},
		registerFailure(state) {
			state.status = {}
		},
		refreshToken(state, user) {
			state.user = user
			state.status.loggedIn = true
		}
	}
}
