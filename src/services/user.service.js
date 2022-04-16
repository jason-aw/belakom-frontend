import axios from "axios"
import authHeader from "./auth-header"
import { ApiPath } from "@/services/api-path"

function getUser() {
  return axios.get(ApiPath.ME_URL, { headers: authHeader('accessToken') })
}

export default userService = {
  getUser
}