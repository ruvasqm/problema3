import React from "react";

import { Route, Switch } from "react-router-dom";

import { Login, Bookings } from "./components/";
import {
  ViewportContextProvider,
  AuthContextProvider,
  BookingsContextProvider,
} from "./context";

export default function App() {
  return (
    <ViewportContextProvider>
      <BookingsContextProvider>
        <AuthContextProvider>
          <Switch>
            <Route exact={true} path="/">
              <Bookings />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            {/*
          <Route path="/recarga" component={Recarga} />
          <Route path="/registro" component={Registro} /> */}
          </Switch>
        </AuthContextProvider>
      </BookingsContextProvider>
    </ViewportContextProvider>
  );
}
