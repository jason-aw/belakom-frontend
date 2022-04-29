import axios from "axios"
import { ApiPath } from './api-path'
import authHeader from "./auth-header"

function uploadFile(file) {
  let req = new FormData()
  req.append("file", file)
  return axios.post(ApiPath.UPLOAD_FILE_URL, req, {
    headers: { 'Content-Type': 'multipart/form-data', ...authHeader('accessToken') }
  }).then(response => {
    if (response.data.success) {
      return Promise.resolve(response.data)
    }
  }).catch(error => Promise.reject(error))
}

function deleteFile(path) {
  return axios.delete(path, { headers: authHeader('accessToken') })
    .then(response => Promise.resolve(response))
    .catch(error => Promise.reject(error))
}

export default {
  uploadFile, deleteFile
}