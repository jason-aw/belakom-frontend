import axios from 'axios';
import { ApiPath } from '../apipath';

const state = {
    user: null,
    accessToken: null,
    refreshToken: null
};
const getters = {
    isAuthenticated: state => !!state.user,
    stateUser: state => state.user,
};
const actions = {
    async register(form) {
        await axios.post(ApiPath.REGISTER_URL, form)
    },
    async logIn({commit}, user) {
        let res = await axios.post(ApiPath.LOGIN_URL, user)
        commit('setAccessToken', res.data.accessToken)
        commit('setRefreshToken', res.data.refreshToken)
        commit('setUser', user.get('email'))
    },
    async logOut({commit}) {
        await axios.post(ApiPath.LOGOUT_URL, user)
        let user = null
        commit('logOut', user)
    }
};
const mutations = {
    setUser(state, email) {
        state.user = email
    },
    setAccessToken(state, accessToken) {
        state.accessToken = accessToken
    },
    setRefreshToken(state, refreshToken) {
        state.refreshToken = refreshToken
    },
    logOut(state) {
        state.user = null
        state.posts = null
    },
};
export default {
    state,
    getters,
    actions,
    mutations
};
