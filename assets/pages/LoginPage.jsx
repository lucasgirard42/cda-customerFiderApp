import React, { useContext, useState } from "react";
import Field from "../components/forms/Field";
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

  // console.log(credentials);
  return (
    <>
      <h1>connexion l'app</h1>

      <form onSubmit={handleSubmit}>
        <Field
          label="adresse email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          type="email"
          placeholder="adresse email de connexion "
          error={error}
        />

        <Field
          name="password"
          label="Mot de passe"
          value={credentials.password}
          onChange={handleChange}
          type="password"
          error=""
        />

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
