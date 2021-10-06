import React, { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import AuthAPI from "../services/authAPI";

const LoginPage = ({ history }) => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // Gestion des champs
  const handleChange = (event) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;
    setCredentials({ ...credentials, [name]: value });
  };

  // Gestion des submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await AuthAPI.authenticate(credentials);
      setError("");
      setIsAuthenticated(true);
      history.replace("/customers");
    } catch (error) {
      setError("aucun compte possède cette adresse email");
    }
  };

  console.log(credentials);
  return (
    <>
      <h1>connexion l'app</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Adresse email</label>
          <input
            value={credentials.email}
            onChange={handleChange}
            id="email"
            type="email"
            placeholder="adresse de connexion"
            name="email"
            className={"form-control" + (error && " is-invalid")}
          />
          {error && <p className="invalid-feedback">{error}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe </label>
          <input
            value={credentials.password}
            onChange={handleChange}
            id="password"
            type="password"
            placeholder="Mot de passe"
            name="password"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-success">
            connexion
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
