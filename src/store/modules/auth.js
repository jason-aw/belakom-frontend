import authService from "@/services/auth.service";
import userService from "@/services/user.service";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { user } : { user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  getters: {
    loggedIn(state) {
      return state.user !== null;
    },
    role(state) {
      return state.user?.roles;
    },
    userId(state) {
      return state.user?.userId;
    }
  },
  actions: {
    login({ commit }, user) {
      return authService.login(user).then(
        (user) => {
          commit("loginSuccess", user);
          return Promise.resolve(user);
        },
        (error) => {
          commit("logout");
          return Promise.reject(error);
        }
      );
    },
    async googleLogin({ commit }, payload) {
      commit("loginSuccess", payload);
      try {
        let res = await userService.getCurrentUserDetail();
        let { name, email, roles, userId, imageUrl } = res.data.value;
        let user = {
          ...payload,
          name,
          email,
          roles,
          userId,
          imageUrl
        }
        commit("loginSuccess", user);
        return Promise.resolve();
      } catch (error) {
        commit("logout");
        return Promise.reject();
      }
    },
    logout({ commit }) {
      authService.logout();
      commit("logout");
    },
    refreshToken({ commit }) {
      return authService.refreshToken().then(
        (response) => {
          commit("refreshToken", response.accessToken);
          return Promise.resolve(response);
        },
        (error) => {
          commit("logout");
          return Promise.reject(error);
        }
      );
    },
  },
  mutations: {
    loginSuccess(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("user");
    },
    refreshToken(state, accessToken) {
      state.user = { ...state.user, accessToken: accessToken };
      localStorage.setItem("user", JSON.stringify(state.user));
    },
  },
};
