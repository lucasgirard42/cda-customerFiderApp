/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, withRouter } from "react-router-dom";
// start the Stimulus application
// import './bootstrap';
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import AuthContext from "./contexts/AuthContext";
import CustomersPage from "./pages/CustomersPage";
import CustomerPage from "./pages/CustomerPage";
import FidelityPointsPage from "./pages/FidelityPointsPage";
import FidelityPointPage from "./pages/FidelityPointPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AuthAPI from "./services/authAPI";
import UsersPage from "./pages/UsersPage";
// any CSS you import will output into a single css file (app.css in this case)
import "./styles/app.css";
import RegisterPage from "./pages/RegisterPage";
import AddPoint from "./pages/addPoint";
import TestPoint from "./pages/TestPoint";

AuthAPI.setup();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthAPI.isAuthenticated()
  );

  const NavbarWithRouter = withRouter(Navbar);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      <HashRouter>
        <NavbarWithRouter />
        <main className="container pt-5">
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            
            <PrivateRoute path="/addPoint/:id" component={AddPoint} />
            <PrivateRoute path="/addPoint" component={AddPoint} />

            <PrivateRoute path="/testPoint" component={TestPoint}/>
            <PrivateRoute path="/testPoint/:id" component={TestPoint}/>

            <PrivateRoute path="/users" component={UsersPage} />
            <PrivateRoute path="/fidelityPoints/:id" component={FidelityPointPage} />
            <PrivateRoute path="/fidelityPoints" component={FidelityPointsPage}/>
            <PrivateRoute path="/customers/:id" component={CustomerPage} />
            <PrivateRoute path="/customers" component={CustomersPage} />
            <Route path="/" component={HomePage} />
          </Switch>
        </main>
      </HashRouter>
      
    </AuthContext.Provider>
  );
};

const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);
