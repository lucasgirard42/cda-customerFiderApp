import axios from "axios";
import jwtDecode from "jwt-decode";

// Déconnexion suprimé le token de localstorge et sur axios
function logout() {
  window.localStorage.removeItem("authToken");
  delete axios.defaults.headers["authorization"];
}

/**
 * requete HTTP authentification et stockage du token dans le storage et sur axios
 * @param {object} credentials 
 * 
 */
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

/**
 * Position le token JWT sur axios
 * @param {string} token le token JWT 
 */
function setAxiosToken(token) {
  axios.defaults.headers["authorization"] = "Bearer " + token;
}

/**
 * mise en place lors du chargement de l'application 
 */
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

/**
 * Permet de savoir si on est authentifier ou pas
 * @returns boolean
 */
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
