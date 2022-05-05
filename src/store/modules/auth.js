import authService from '@/services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { user } : null;

export const auth = {
	namespaced: true,
	state: initialState,
	getters: {
		loggedIn(state) {
			return state.user ? true : false;
		}
	},
	actions: {
		login({ commit }, user) {
			return authService.login(user).then(
				user => {
					commit('loginSuccess', user)
					return Promise.resolve(user)
				},
				error => {
					commit('logout')
					return Promise.reject(error)
				}
			)
		},
		logout({ commit }) {
			authService.logout()
			commit('logout')
		},
		register(user) {
			return authService.register(user).then(
				response => {
					return Promise.resolve(response.data)
				},
				error => {
					return Promise.reject(error)
				}
			)
		},
		googleLogin({ commit }, user) {
			commit('loginSuccess', user)
		},
		refreshToken({ commit }) {
			return authService.refreshToken().then(
				response => {
					commit('refreshToken', response.accessToken)
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
			state.user = user
			localStorage.setItem('user', JSON.stringify(user))
		},
		logout(state) {
			state.user = null
			localStorage.removeItem('user')
		},
		refreshToken(state, accessToken) {
			state.user = { ...state.user, accessToken: accessToken }
			localStorage.setItem('user', JSON.stringify(state.user))
		}
	}
}
