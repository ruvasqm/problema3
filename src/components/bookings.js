import React, { useContext, Fragment } from "react";
import { Redirect, Link } from "react-router-dom";
import { BookingTable } from "../components";
import { AuthContext } from "../context/";

export default function Bookings() {
  const { isAuthenticated, setAuth } = useContext(AuthContext);

  const logOut = () => {
    localStorage.clear();
    setAuth(false);
  };
  return (
    <Fragment>
      <nav className="navbar navbar-expand navbar-dark bg-dark mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand nav-link">
            Tuten
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link" onClick={logOut}>
                  Salir
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container">
        <h2 className="display-2 font-weight-bolder mt-3">Bookings</h2>
        <div className="row">
          {isAuthenticated ? <BookingTable /> : <Redirect to="/login" />}
        </div>
      </div>
    </Fragment>
  );
}
