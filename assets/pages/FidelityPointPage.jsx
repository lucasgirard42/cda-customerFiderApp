import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Field from "../components/forms/Field";
import Select from "../components/forms/Select";
import FidelityPointsAPi from "../services/fidelityPointsAPi";
import CustomersAPI from "../services/customersAPI";
import axios from "axios";

const FidelityPoint = ({ history, match }) => {
  //Gestion paramètre dans l'url
  const { id = "new" } = match.params;

  // Etats
  const [fidelityPoint, setFidelityPoint] = useState({
    pointFidelityCustomer: 0,
    customer: "",
  });
  // const [fidelityPoint, setFidelityPoint] = useState([]);

  const [customers, setCustomers] = useState([]);
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState({
    pointFidelityCustomer: "",
    customer: "",
  });

  const handleIncrement = () => {
    setFidelityPoint({
      ...fidelityPoint,
      pointFidelityCustomer: fidelityPoint.pointFidelityCustomer + (fidelityPoint.pointFidelityCustomer < 4 ? 1:0 )   // <------ a revoir
    });
  };


  // Récupération des clients
  const fetchCustomers = async () => {
    try {
      const data = await CustomersAPI.findAll();
      setCustomers(data);
      if (!fidelityPoint.customer)
        setFidelityPoint({ ...fidelityPoint, customer: data[0].id }); //// <---- Recupération de data customer sans modification de la page pour fetch
    } catch (error) {
      // TODO notification error
      history.replace("/fidelityPoints");
      console.log(error.response);
    }
  };

  // Récupération d'un point de fidélité
  const fetchFidelityPoint = async (id) => {
    try {
      const data = await FidelityPointsAPi.find(id);
      const { pointFidelityCustomer, customer } = data;
      
      setFidelityPoint({ pointFidelityCustomer, customer: customer.id });
    } catch (error) {
      console.log(error.response);

      // TODO notification error
      history.replace("/fidelityPoints");
    }
  };

  //Récupération de la liste des clients à chaque chargement du composant
  useEffect(() => {
    fetchCustomers();
  }, []);

  // Récupération de la facture quand l'id de l'url change
  useEffect(() => {
    if (id !== "new") {
      setEditing(true);
      fetchFidelityPoint(id);
    }
  }, [id]);

  // Gestion des changement des imputs dans le formulaire
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setFidelityPoint({ ...fidelityPoint, [name]: value });
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      if (editing) {
        console.log(fidelityPoint);
        await FidelityPointsAPi.update(id, fidelityPoint);
        history.replace("/fidelityPoints");
        // Todo notificacion
      } else {
        await FidelityPointsAPi.create(fidelityPoint);
        // TODO NOTIFICATIO SUCCESS
        history.replace("/fidelityPoints");
      }
    } catch (error) {
      if (error.response.data.violations) {
        const apiErrors = {};
        error.response.data.violations.map((violation) => {
          apiErrors[violation.propertyPath] = violation.message;
        });
        setErrors(apiErrors);
        console.log(apiErrors);

        // TODO notification des erreurs
      }
    }
  };

  

  return (
    <>
      
        {(editing && <h1>Modification point de fidelité</h1>) || (
          <h1>Création des point de fidelité</h1>
        )}
        <form onSubmit={handleSubmit}>
          {/* <Field
            name="pointFidelityCustomer"
            type="hidden"       // <------------------ A revoir sur ce type
            placeholder="nombre de point de fidelité"
            label="point"
            onChange={handleChange}
            value={fidelityPoint.pointFidelityCustomer}
            errors={errors.pointFidelityCustomer}
          /> */}
          <div className="form-group">
          {/* <p>{fidelityPoint.customer}</p>
          <p>{fidelityPoint.pointFidelityCustomer}</p> */}
          <button
                className="btn btn-sm btn-success"
                onClick={handleIncrement}
                type="submit"
              >
                +1
              </button>
        </div>
          {/* <div className="form-group">
            <label htmlFor="customer">client</label>
            <select
              name="customer"
              id="customer"
              value={fidelityPoint.customer}
              onChange={handleChange}
              // className={"form-control" + (error && "is-invalid")}
            >
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.firstName} {customer.lastName}
                </option>
              ))}
            </select>
            <button>+</button>
           
          </div> */}
          <div className="form-group mt-3">
            <button type="submit" className="btn btn-success">
              ADD
            </button>
            <Link to="/FidelityPoints" className="btn btn-link">
              Retour
            </Link>
          </div>
        </form>

    </>
  );
};

{
  /* <Select
            name="customer"
            label="client"
            value={customers.customer}  /// Attention a revoir avec les points 
            error={errors.customer}
            Onchange={handleChange}
          >
            {customers.map((customer) => (
              <option key={customer.id} value={customer.firstName} >
                {customer.firstName} {customer.lastName}
              </option>
            ))}
          </Select> */
}

export default FidelityPoint;
