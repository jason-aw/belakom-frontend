import axios from "axios";
import { ApiPath } from "./api-path";
import authHeader from "./auth-header";

function getCurrentUserDetail() {
	return axios.get(ApiPath.GET_CURRENT_USER_DETAIL, { headers: authHeader("accessToken") })
		.then((response) => Promise.resolve(response))
		.catch((error) => Promise.reject(error.response.data));
}

function updateUserData(req) {
	return axios
		.post(ApiPath.UPDATE_USER_DATA_URL, req, { headers: authHeader("accessToken") })
		.then((response) => Promise.resolve(response))
		.catch((error) => Promise.reject(error.response.data));
}

export default {
	updateUserData, getCurrentUserDetail
};
