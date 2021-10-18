import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import CustomersAPI from "../services/customersAPI";
import moment from "moment";
import { Link } from "react-router-dom";

const CustomersPage = (props) => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  // Permet d'aller récupérer les tous les clients (appel a l'api pour find tous les clients)
  const fetchCustomers = async () => {
    try {
      const data = await CustomersAPI.findAll(); 
      setCustomers(data);
      console.log(data);         // <================= 
    } catch (error) {
      console.log(error.response);
    }
  };

  // Au chargement du composant, on va chercher les customers  
  useEffect(() => {
    fetchCustomers(); 
  }, []);

  // Gestion de la suppression d'un client (appel a l'api pour delete un client)
  const handleDelete = async (id) => {
    const originalCustomers = [...customers];
    setCustomers(customers.filter((customer) => customer.id !== id));
    
    try {
      await CustomersAPI.delete(id); 
    } catch (error) {
      setCustomers(originalCustomers);
      console.log(error.response);
    }
  };

  // Gestion du changement de page
  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  //Gestion de la recherche
  const handleSearch = ({currentTarget}) => {
    setSearch(currentTarget.value);
    setCurrentPage(1);
  };

  //  const handleSearch = (event) => {
  //   const value = event.currentTarget.value;
  //   setSearch(value);
  //   setCurrentPage(1);
  // };

  const itemsPerPage = 10;

  // filtrage des clients en fonction de la recherche
  const filteredCustomers = customers.filter(
    (c) =>
      c.firstName.toLowerCase().includes(search.toLowerCase()) ||
      c.lastName.toLowerCase().includes(search.toLowerCase()) ||
      (c.email && c.email.toLowerCase().includes(search.toLowerCase()))
  );
  
  // Pagination des données
  const paginatedCustomers = Pagination.getData(
    filteredCustomers,
    currentPage,
    itemsPerPage
  );

  const formatDate = (str) => moment(str).format('DD/MM/YYYY');
// console.log(customers);
  return (
    <>
      
        <div className="mb-2 d-flex justify-content-between align-items-center">
          <h1>liste des clients</h1>
          <Link to="/customers/new" className="btn btn-primary">
            Crée un client
          </Link>
        </div>
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
              <th>Id</th>
              <th>Client</th>
              <th>Email</th>
              <th>Service</th>
              <th className="text-center">Point de Fidelité</th>
              <th>Dernier Point Ajouté </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paginatedCustomers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>
                  <a href="#">
                    {customer.firstName} {customer.lastName}{" "}
                  </a>
                </td>
                <td>{customer.email}</td>
                <td>{customer.service}</td>
                {customer.fidelityPoints.map((points) => (
                  <td key={points.id} className="text-center">
                    + {points.pointFidelityCustomer} point
                  </td>
                ))}
                {customer.fidelityPoints.map((createdpoints) => (
                  <td key={createdpoints.id}>
                    {formatDate(createdpoints.createdAt)}
                  </td>
                ))}
                <td>
                <Link to={"/customers/"+customer.id} className="btn btn-sm btn-primary me-2">
                    Editer
                  </Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(customer.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {itemsPerPage < filteredCustomers.length && (
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            length={filteredCustomers.length}
            onPageChange={handleChangePage}
          />
        )}
      
    </>
  );
};
export default CustomersPage;
