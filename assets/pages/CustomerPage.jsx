import React, { useState } from "react";
import Field from "../components/forms/Field";
import { Link } from "react-router-dom";
import axios from "axios";

const CustomerPage = (props) => {
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

  console.log(props);
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

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://127.0.0.1:8000/api/customers",
        customer
      );
      // console.log(response.data);
    } catch (error) {
      // console.log(error.response);

    }
  };

  return (
    <>
      <div className="container">
        <h1>création d'un client</h1>

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
