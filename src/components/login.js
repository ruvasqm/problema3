import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated, setAuth, AuthContext } from "../context";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setAuth } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();
    // logging
    const url =
      "https://dev.tuten.cl/TutenREST/rest/user/" + email.replace("@", "%40");
    const options = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        app: "APP_BCK",
        password: password.toString(),
      },
      //body: JSON.stringify({}),
    };

    fetch(url, options).then((response) => {
      let data = response
        .json()
        .then((data) => {
          if (response.ok) {
            localStorage.setItem("email", "contacto@tuten.cl");
            localStorage.setItem("adminEmail", email);
            localStorage.setItem("token", data.sessionTokenBck);
            setAuth(true);
          }
        })
        .catch((error) => {
          console.log("invalid request");
          console.log(error);
        });
    });
  }

  return (
    <div className="container vh-100">
      <div className="row h-75">
        <div className="col-12 my-auto">
          <h1 className="display-2 text-center font-weight-bolder">TUTEN</h1>
          <form className="" onSubmit={handleSubmit}>
            <div className="form-group row">
              <div className="col-10 offset-1 col-md-4 offset-md-4">
                <label
                  htmlFor="email"
                  className="col-4 col-md-2 col-form-label"
                >
                  Email
                </label>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-10 offset-1 col-md-4 offset-md-4">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="email@tuten.cl"
                  required="required"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-10 offset-1 col-md-4 offset-md-4">
                <label
                  htmlFor="password"
                  className="col-4 col-md-2 col-form-label"
                >
                  Contraseña
                </label>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-10 offset-1 col-md-4 offset-md-4">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder=""
                  required="required"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-10 offset-1 col-md-4 offset-md-4">
                <button
                  type="submit"
                  className="btn btn-lg btn-primary mt-4 btn-block font-weight-bolder"
                >
                  INGRESAR
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {isAuthenticated ? <Redirect to="/" /> : ""}
    </div>
  );
}
