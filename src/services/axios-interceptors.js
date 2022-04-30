import store from "@/store"
import { ApiPath } from "./api-path"
import authHeader from "./auth-header"

export default function setupInterceptors(axios) {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const originalConfig = error.config
      if (error.config.url !== ApiPath.LOGIN_URL && error.response) {
        if (error.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true
          return store.dispatch('auth/refreshToken')
            .then(() => {
              return axios({ ...originalConfig, headers: authHeader('accessToken') })
            })
            .catch(err => Promise.reject(err))
        }
      }
      return Promise.reject(error)
    }
  )
}
