import moment from "moment";
import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import fidelityPointsAPi from "../services/fidelityPointsAPi";

const FidelityPointsPage = () => {
  const [fidelityPoints, setFidelityPoints] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const itemsPerPage = 10;

  // Récupération des point de fidelité à l'API
  const fetchFidelityPoints = async () => {
    try {
      const data = await fidelityPointsAPi.findAll();
      setFidelityPoints(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  // Charger les fidelityPoints au chargement du composant
  useEffect(() => {
    fetchFidelityPoints();
  }, []);

  // Gestion du changement de page
  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  //Gestion de la recherche
  const handleSearch = ({currentTarget}) => {
    setSearch(currentTarget.value);
    setCurrentPage(1);
  };

  // Gestion de la suppression 
  const handleDelete = async id => {
    const originalFidelityPoint = [...fidelityPoints];
    setFidelityPoints(fidelityPoints.filter(fidelityPoint => fidelityPoint.id !== id))
    try {
      await fidelityPointsAPi.delete(id);
    } catch (error) {
      console.log(error.response);
      setFidelityPoints(originalFidelityPoint);
    }
  }

  
  // Gestion du formate de date
  const formatDate = (str) => moment(str).format('DD/MM/YYYY');

  // gestion de la recherche
  const filteredFidelityPoints = fidelityPoints.filter(
      (f) =>
        (f.customer.email && f.customer.email.toLowerCase().includes(search.toLowerCase())) ||
         ( f.pointFidelityCustomer && f.pointFidelityCustomer.toString().includes(search.toLowerCase()))
            
  );

  console.log(filteredFidelityPoints);
  // Pagination des données
  const paginatedFidelityPoints = Pagination.getData(
    filteredFidelityPoints,
    currentPage,
    itemsPerPage
  );

//   console.log(fidelityPoints);
  return (
    <>
      <div className="container">
        <h1>Liste des points de fidelité des clients </h1>
        <div className="form-group">
          <input
            type="text"
            onChange={handleSearch}
            value={search}
            className="form-control"
            placeholder="Rechercher..."
          />
        </div>
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
            {paginatedFidelityPoints.map((fidelityPoint) => (
              <tr key={fidelityPoint.id}>
                <td>{fidelityPoint.id}</td>
                <td>
                  <a href="#">{fidelityPoint.customer.email}</a>
                </td>
                <td>+ {fidelityPoint.pointFidelityCustomer} point</td>
                <td>{formatDate(fidelityPoint.createdAt)}</td>
                <td>{formatDate(fidelityPoint.updatedAt)}</td>
                <td>
                  <button className="btn btn-sm btn-primary me-2">
                    Editer
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(fidelityPoint.id) }>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} onPageChange={handleChangePage} length={filteredFidelityPoints.length} />
      </div>
    </>
  );
};

export default FidelityPointsPage;
