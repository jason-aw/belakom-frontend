import store from "@/store"
import { ApiPath } from "./api-path"

export default function setupInterceptors(axios) {
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalConfig = error.config
      if (error.config.url !== ApiPath.LOGIN_URL && error.response) {
        if (error.response.status === 401 && !originalConfig._retry) {
          console.log("refresh token by interceptor")
          originalConfig._retry = true
          try {
            await store.dispatch('auth/refreshToken')
            return axios(originalConfig)
          } catch (err) {
            return Promise.reject(err)
          }
        }
      }
      return Promise.reject(error)
    }
  )
}
