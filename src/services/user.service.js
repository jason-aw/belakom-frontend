import axios from "axios"
import authHeader from "./auth-header"
import { ApiPath } from "@/services/apipath"

function getUser() {
  return axios.get(ApiPath.ME_URL, { headers: authHeader() })
}

export default userService = {
  getUser
}
