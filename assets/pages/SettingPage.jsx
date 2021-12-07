import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
// import CustomersAPI from "../services/customersAPI";
import UsersAPI from '../services/UsersAPI';

import moment from "moment";
import { Link } from "react-router-dom";

const SettingPage = (props) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  

  // Permet d'aller récupérer les tous les clients (appel a l'api pour find tous les clients)
  const fetchUsers = async () => {
    try {
      const data = await UsersAPI.findAll(); 
      setUsers(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  // Au chargement du composant, on va chercher les Users 
  useEffect(() => {
    fetchUsers(); 
  }, []);

  // Gestion de la suppression d'un client (appel a l'api pour delete un client)
  const handleDelete = async (id) => {
    const originalUsers = [...users];
    setUsers(users.filter((user) => user.id !== id));
    
    try {
      await UsersAPI.delete(id); 
    } catch (error) {
      setUsers(originalUsers);
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
  const filteredUsers = users.filter(
    (u) =>
      (u.email && u.email.toLowerCase().includes(search.toLowerCase()))
  );
  
  // Pagination des données
  const paginatedUsers = Pagination.getData(
    filteredUsers,
    currentPage,
    itemsPerPage
  );

  const formatDate = (str) => moment(str).format('DD/MM/YYYY');
// console.log(customers);
  return (
    <>
      <div className="container">
        <div className="mb-2 d-flex justify-content-between align-items-center">
          <h1>liste des clients</h1>
          <Link to="/users/new" className="btn btn-primary">
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
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                    <Link to={"/setting/" + user.id}>
                    {user.email}
                    </Link>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(user.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {itemsPerPage < filteredUsers.length && (
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            length={filteredUsers.length}
            onPageChange={handleChangePage}
          />
        )}
      </div>
    </>
  );
};
export default SettingPage;
