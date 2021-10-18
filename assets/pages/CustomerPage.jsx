import React, { useEffect, useState } from "react";
import Field from "../components/forms/Field";
import { Link } from "react-router-dom";
import CustomersAPI from "../services/customersAPI";

const CustomerPage = (props) => {

  const {id ="new"} = props.match.params;

 

  const [customer, setCustomer] = useState({
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
    address: "",
    zipcode: "",
    city: "",
    society: "",
    // image: "",
    service: "",
  });

  // console.log(props);
  const [errors, setErrors] = useState({
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
    address: "",
    zipcode: "",
    city: "",
    society: "",
    // image: "",
    service: "",
  });

  const [editing, setEditing] = useState(false);


  // Récuprération du customer selon l'id 
  const fetchCustomer = async (id) => {
    try {
      const {firstName, lastName, email, phone, address, zipcode, city, society, service, fidelityPoints} = await CustomersAPI.find(id);  // destructuration de data 
      setCustomer({firstName, lastName, email, phone, address, zipcode, city, society, service, fidelityPoints})
      // console.log(data);
    } catch (error) {
      console.log(error.response);
      history.replace('/customers');
    }
  }; 



  // chargement du customer si besoin au chargement du composant ou au changement de l'id 
  useEffect(()=> {
    if (id !== "new") {
      setEditing(true);
      fetchCustomer(id);
    }; 
  }, [id]);

  // Gestion des changement des imputs dans le formulaire
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setCustomer({ ...customer, [name]: value });
  };

  //Gestion de la soumission du formulaire 
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editing) {
        await CustomersAPI.update(id, customer);
        props.history.replace("/customers"); 
        // TODO notification de success
      } else {
        await CustomersAPI.create(customer);

        // TODO notification de success
        props.history.replace("/customers"); // <------- revenir a la liste des clients
      }

      setErrors({});
      // console.log(response.data);
    } catch (error) {
      if (error.response.data.violations) {
        const apiErrors = {};
        error.response.data.violations.map((violation) => {
          apiErrors[violation.propertyPath] = violation.message;
        });
        setErrors(apiErrors);
        // console.log(apiErrors);

        // TODO notification des erreurs
      }
    }
  };

  return (
    <>
      <div className="container">
        {! editing && <h1>création d'un client</h1> || <h1>Modification du client </h1>}

        <form onSubmit={handleSubmit}>
          <Field
            onChange={handleChange}
            value={customer.lastName}
            name="lastName"
            label="Nom de famille"
            placeholder="Nom de famille du client"
            error={errors.lastName}
          />
          <Field
            onChange={handleChange}
            value={customer.firstName}
            name="firstName"
            label="Prénom"
            placeholder="Prénom du client"
            error={errors.firstName}
          />
          <Field
            onChange={handleChange}
            value={customer.email}
            name="email"
            label="Email"
            placeholder="Email du client"
            type="email"
            error={errors.email}
          />
          <Field
            onChange={handleChange}
            value={customer.phone}
            name="phone"
            label="Numéro de téléphone"
            placeholder="Numéro de téléphone du client"
            type="number"
            error={errors.phone}
          />
          <Field
            onChange={handleChange}
            value={customer.address}
            name="address"
            label="Adresse"
            placeholder="Adresse du client"
            error={errors.address}
          />
          <Field
            onChange={handleChange}
            value={customer.zipcode}
            name="zipcode"
            label="Adresse postal"
            placeholder="Adresse postale du client"
            type="number"
            error={errors.zipcode}
          />
          <Field
            onChange={handleChange}
            value={customer.city}
            name="city"
            label="Ville"
            placeholder="Ville du client"
            error={errors.city}
          />
          <Field
            onChange={handleChange}
            value={customer.society}
            name="society"
            label="Société "
            placeholder="Société du client"
            error={errors.society}
          />
          {/* <Field
            onChange={handleChange}
            value={customer.image}
            name="image"
            label="Image profile "
            placeholder="image profile du client"
            error={errors.image}
          /> */}
          <Field
            onChange={handleChange}
            value={customer.service}
            name="service"
            label="Service"
            placeholder="Type de service du client"
            error={errors.service}
          />
          <div className="form-group">
            <button type="submit" className="btn btn-success">
              Enregistrer
            </button>
            <Link to="/customers" className="btn btn-link">
              retour a la liste des clients
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default CustomerPage;
