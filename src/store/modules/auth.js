import axios from 'axios';
const state = {
    user: null
};
const getters = {
    isAuthenticated: state => !!state.user,
    stateUser: state => state.user,
};
const actions = {
    async register({dispatch}, form) {
        await axios.post('register', form)
        let userForm = new FormData()
        userForm.append('email', form.email)
        userForm.append('password', form.password)
        await dispatch('logIn', userForm)
    },
    async logIn({commit}, user) {
        await axios.post('login', user)
        await commit('setUser', user.get('email'))
    },
    async logOut({commit}){
        let user = null
        commit('logOut', user)
    }
};
const mutations = {
    setUser(state, email){
        state.user = email
    },
    logOut(state){
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
