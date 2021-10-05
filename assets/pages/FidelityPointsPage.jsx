import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import axios from "axios";

const FidelityPointsPage = () => {
  const [fidelityPoints, setFidelityPoints] = useState([]);

  const fetchFidelityPoints = async () => {
    try {
      const data = await axios
        .get("https://127.0.0.1:8000/api/fidelity_points")
        .then((response) => response.data["hydra:member"]);
      setFidelityPoints(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchFidelityPoints();
  }, []);

  console.log(fidelityPoints);
  return (
    <>
      <div className="container">
        <h1>Liste des points de fidelité des clients </h1>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>id</th>
              <th>Email du client</th>
              <th>nombre de point de fidelité du client </th>
              <th>date de la création du point</th>
              <th>date dernière du point ajouté</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {fidelityPoints.map((fidelityPoint) => (
              <tr key={fidelityPoint.id}>
                <td>{fidelityPoint.id}</td>
                <td>{fidelityPoint.customer.email}</td>
                <td>{fidelityPoint.pointFidelityCustomer}</td>
                <td>{fidelityPoint.createdAt}</td>
                <td>{fidelityPoint.updatedAt}</td>
                <td>
                  <button className="btn btn-sm btn-primary me-2">
                    Editer
                  </button>
                  <button className="btn btn-sm btn-danger">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FidelityPointsPage;
