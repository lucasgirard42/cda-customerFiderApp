/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
import "bootstrap/dist/js/bootstrap"
import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, withRouter } from "react-router-dom";

import Navbar from "./components/Navbar";

import PrivateRoute from "./components/PrivateRoute";
import AuthContext from "./contexts/AuthContext";
import UserContext from "./contexts/UserContext";
import CustomersPage from "./pages/CustomersPage";
import CustomerPage from "./pages/CustomerPage";
import FidelityPointsPage from "./pages/FidelityPointsPage";
import FidelityPointPage from "./pages/FidelityPointPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AuthAPI from "./services/authAPI";
// any CSS you import will output into a single css file (app.css in this case)
import "./styles/app.css";
import RegisterPage from "./pages/RegisterPage";
import CustomerIdPage from "./pages/CustomerIdPage";
import SettingPage from "./pages/SettingPage";
import SettingUserPage from "./pages/SettingUserPage";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

AuthAPI.setup();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthAPI.isAuthenticated()
  );
  const [userData, setUserData] = useState({});

  const NavbarWithRouter = withRouter(Navbar);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
     <UserContext.Provider
      value={{
        userData,
        setUserData,
      }}
    >  
      <HashRouter>
        <NavbarWithRouter />
        <main className="container pt-5">
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />

            <PrivateRoute path="/setting/:id" component={SettingUserPage} />
            <PrivateRoute path="/setting" component={SettingPage} />

            <PrivateRoute path="/fidelityPoints/:id" component={FidelityPointPage} />
            <PrivateRoute path="/fidelityPoints" component={FidelityPointsPage}/>

            <PrivateRoute path="/customer/:id" component={CustomerIdPage} />
            <PrivateRoute path="/customers/:id" component={CustomerPage} />
            <PrivateRoute path="/customers" component={CustomersPage} />

            <Route path="/" component={HomePage} />
          </Switch>
        </main>
      </HashRouter>
      <ToastContainer position={toast.POSITION.TOP_RIGHT} /> 
    </UserContext.Provider> 
    </AuthContext.Provider>
  );
};


const rootElement = document.querySelector("#app");
ReactDOM.render(<App />,  rootElement);

