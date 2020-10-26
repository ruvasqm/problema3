import React, { useState, useEffect, createContext, useContext } from "react";
import { BookingsContext } from "./";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (
      !localStorage.getItem("email") ||
      !localStorage.getItem("token") ||
      !localStorage.getItem("adminEmail")
    ) {
      return false;
    } else return true;
  });

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const { setBooks } = useContext(BookingsContext);

  async function isAuth() {
    if (
      !localStorage.getItem("email") ||
      !localStorage.getItem("token") ||
      !localStorage.getItem("adminEmail")
    ) {
      setIsAuthenticated(false);
    } else {
      fetch(
        "https://dev.tuten.cl/TutenREST/rest/user/" +
          (localStorage.email ? localStorage.email : "").replace("@", "%40") +
          "/bookings?current=true",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            token: localStorage.token ? localStorage.token : "",
            adminemail: localStorage.adminEmail ? localStorage.adminEmail : "",
            app: "APP_BCK",
          },
        }
      )
        .then((response) => {
          if (response.ok) {
            setIsAuthenticated(true);
            response
              .json()
              .then((data) => {
                setBooks(
                  data.map((booking) => ({
                    bookingId: booking.bookingId,
                    cliente:
                      booking.tutenUserClient.firstName +
                      " " +
                      booking.tutenUserClient.lastName,
                    fechaDeCreacion: new Date(parseInt(booking.bookingTime)),
                    direccion: booking.locationId.streetAddress,
                    precio: booking.bookingPrice,
                  }))
                );
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            setIsAuthenticated(false);
            setBooks([]);
          }
        })
        .catch((error) => {
          console.log(error.response);
          return false;
        });
    }
  }

  useEffect(() => {
    isAuth();
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, setAuth }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
