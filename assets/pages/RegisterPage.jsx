import React, { useState } from "react";
import Field from "../components/forms/Field";
import { Link } from "react-router-dom";
import axios from "axios";
import UserAPI from "../services/userAPI";
import { toast } from "react-toastify";

const RegisterPage = ({ history }) => {
  const [user, setUser] = useState({
    company: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [errors, setErros] = useState({
    company: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  // Gestion des changement des imputs dans le formulaire
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const ApiErrors = {};

    if (user.password !== user.passwordConfirm) {
      ApiErrors.passwordConfirm =
        "votre confirmation de mot de passe n'est pas conforme avec le mot de passe "; // condition pour la confirmation de mdp si false alors on interrompe la requete avec un return
      setErros(ApiErrors);
      // toast.error("Il y a des erreur dans le formulaire");
      return;
    }
    try {
      await UserAPI.register(user);
      // setErros({})
      toast.success("vous êtes inscrit ! veuillez vous connecter ");
      history.replace("/login");
      console.log(response);
    } catch (error) {
      console.log(error.response);
      toast.error("Il y a des erreur dans le formulaire");
    }
  };

  return (
    <>
      
        <h1>Inscription</h1>
        <form onSubmit={handleSubmit}>
          <Field
            name="company"
            label="Entreprise"
            placeholder="Nom de votre entreprise"
            error={errors.company}
            value={user.company}
            onChange={handleChange}
          />
          <Field
            name="email"
            label="Email"
            placeholder="Votre email"
            error={errors.email}
            value={user.email}
            onChange={handleChange}
          />
          <Field
            name="password"
            label="mot de passe "
            placeholder="mot de passe"
            type="password"
            error={errors.password}
            value={user.password}
            onChange={handleChange}
          />
          <Field
            name="passwordConfirm"
            label="Confirmation de mot de passe "
            placeholder="Confirmez votre mot de passe"
            type="password"
            error={errors.passwordConfirm}
            value={user.passwordConfirm}
            onChange={handleChange}
          />
          <div className="form-group">
            <button type="submit" className="btn btn-success">
              Confirmation
            </button>
            <Link to="/login" className="btn btn-link">
              Vous avez un compte ?{" "}
            </Link>
          </div>
        </form>
   
    </>
  );
};

export default RegisterPage;
