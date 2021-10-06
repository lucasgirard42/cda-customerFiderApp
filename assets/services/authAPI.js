import axios from "axios";
import jwtDecode from "jwt-decode";

function logout() {
  window.localStorage.removeItem("authToken");
  delete axios.defaults.headers["authorization"];
}

function authenticate(credentials) {
  return axios
    .post("https://127.0.0.1:8000/api/login", credentials)
    .then((response) => response.data.token)
    .then((token) => {
      // stocker le token dans le localStorage
      window.localStorage.setItem("authToken", token);

      // On prévient axios qu'on a maintenant un header par default sur toutes nos future requete http
      setAxiosToken(token);

      return true;
    });
}

function setAxiosToken(token) {
  axios.defaults.headers["authorization"] = "Bearer " + token;
}

function setup() {
  // 1. Voir si on a un token ?
  const token = window.localStorage.getItem("authToken");
  // 2. Si le token est encore valide
  if (token) {
    const { exp: expiration } = jwtDecode(token);
    if (expiration * 1000 > new Date().getTime()) {
      setAxiosToken(token);
    }
  }
}

function isAuthenticated() {
    const token = window.localStorage.getItem("authToken");

    if (token) {
        const { exp: expiration } = jwtDecode(token);
        if (expiration * 1000 > new Date().getTime()) {
          return true;
        }
        return false;
      }
      return false;

}

export default {
  authenticate,
  logout,
  setup,
  isAuthenticated
};
