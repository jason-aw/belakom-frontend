import store from "@/store";

export default function authHeader(token) {
  let user = store.state.auth.user;

  if (user && user[token]) {
    return {
      Authorization: "Bearer " + user[token],
      "Content-Type": "application/json",
    };
  } else {
    return { "Content-Type": "application/json" };
  }
}
