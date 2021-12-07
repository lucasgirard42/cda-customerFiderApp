import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import AuthAPI from "../services/authAPI";
import AuthContext from "../contexts/AuthContext";
import UsersAPI from "../services/UsersAPI";

const Navbar = ({ history}) => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const handleLogout = () => {
    AuthAPI.logout();
    setIsAuthenticated(false);
    history.push("/login");
  };

  const [users, setUser] = useState([]);

  const fetchUsers = async () => {
    try {
      const data = await UsersAPI.findAll(); 
      setUser(data);
    } catch (error) {
      console.log(error.response);
    }
  };

//   const fetchUser = async (id) =>{
//     try {
//        const data =  await UsersAPI.find(id);
//         // setUser({email, company, mail, reduction })
//         console.log(data);
//     } catch (error) {
//         console.log(error.response);
//     }
// }

// useEffect(() => {
//   fetchUser(id);
// }, [id]);

// console.log(AuthContext);

useEffect(() => {
  fetchUsers(); 
}, []);


  // console.log('c mon id',match);



  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Fider app
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link active" to="/">
                Home
                <span className="visually-hidden">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/customers">
                Clients
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/fidelityPoints">
                point de fidilité
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/addPoint">
                addpoint
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/setting/31">
                Paramètre 
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            {(!isAuthenticated && (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    Inscription
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="btn btn-success">
                    Connexion !
                  </NavLink>
                </li>
              </>
            )) || (
              <li className="nav-item">
                <button onClick={handleLogout} className="btn btn-danger">
                  Déconnexion
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

{
  /* <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
          <div className="dropdown-menu">
            <a className="dropdown-item" href="#">Action</a>
            <a className="dropdown-item" href="#">Another action</a>
            <a className="dropdown-item" href="#">Something else here</a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="#">Separated link</a>
          </div>
        </li> */
}
