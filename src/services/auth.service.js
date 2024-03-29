import axios from "axios";
import { ApiPath } from "./api-path";
import store from "@/store";
import authHeader from "./auth-header";

function login(user) {
  let req = {
    email: user.email,
    password: user.password,
  };

  return axios
    .post(ApiPath.LOGIN_URL, req)
    .then((response) => {
      let { accessToken, refreshToken, email, roles, userId } = response.data;
      return Promise.resolve({ accessToken, refreshToken, email, roles, userId });
    })
    .catch((error) => Promise.reject(error));
}

function logout() {
  let user = store.state.auth.user;
  let req = {
    accessToken: user.accessToken,
    refreshToken: user.refreshToken,
  };
  axios
    .post(ApiPath.LOGOUT_URL, req)
    .then((response) => Promise.resolve(response))
    .catch((error) => Promise.reject(error));
}

function register(user) {
  let req = {
    name: user.name,
    email: user.email,
    password: user.password,
  };
  return axios
    .post(ApiPath.REGISTER_URL, req)
    .then((response) => Promise.resolve(response))
    .catch((error) => Promise.reject(error.response.data));
}

function refreshToken() {
  return axios
    .get(ApiPath.REFRESH_TOKEN_URL, { headers: authHeader("refreshToken") })
    .then((response) => {
      let { accessToken, refreshToken } = response.data;
      return Promise.resolve({ accessToken, refreshToken });
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

function forgotPassword(req) {
  return axios.post(ApiPath.FORGOT_PASSWORD_URL, req)
    .then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error));
}

function resetPassword(req) {
  return axios.post(ApiPath.RESET_PASSWORD_URL, req)
    .then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error));
}

export default {
  login,
  logout,
  register,
  refreshToken,
  forgotPassword,
  resetPassword,
};
