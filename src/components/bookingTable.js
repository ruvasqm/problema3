import React, { useState, useContext, Fragment } from "react";
import { useViewport, BookingsContext, filterBooks } from "../context";

const MobileRow = ({ booking }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <Fragment>
      <tr
        onClick={() => setShowDetails((prev) => !prev)}
        className={showDetails ? "table-active d-flex" : "d-flex"}
      >
        <th scope="row" className="col-2">
          {booking.bookingId}
        </th>
        <td className="col-7">{booking.cliente}</td>
        <td className="col-3">{booking.precio + " $"}</td>
      </tr>
      {showDetails ? (
        <Fragment>
          <tr
            onClick={() => setShowDetails((prev) => !prev)}
            className="d-flex"
          >
            <td className="col-1"></td>
            <th scope="row" className="col-5">
              Dirección
            </th>
            <td className="col-6">{booking.direccion}</td>
          </tr>
          <tr
            onClick={() => setShowDetails((prev) => !prev)}
            className="d-flex"
          >
            <td className="col-1"></td>
            <th scope="row" className="col-5">
              Fecha de Creación
            </th>
            <td className="col-6">
              {booking.fechaDeCreacion.getDate() +
                "-" +
                booking.fechaDeCreacion.getMonth() +
                "-" +
                (
                  parseInt(booking.fechaDeCreacion.getFullYear()) - 100
                ).toString()}
            </td>
          </tr>
        </Fragment>
      ) : null}
    </Fragment>
  );
};

function MobileComponent() {
  const { filteredBookings } = useContext(BookingsContext);

  return (
    <table className="table table-sm">
      <thead>
        <tr className="d-flex">
          <th scope="col" className="col-2">
            Id
          </th>
          <th scope="col" className="col-7">
            Cliente
          </th>
          <th scope="col" className="col-3">
            Precio
          </th>
        </tr>
      </thead>
      <tbody>
        {filteredBookings.map((booking) => (
          <MobileRow booking={booking} key={booking.bookingId} />
        ))}
      </tbody>
    </table>
  );
}

function DesktopComponent() {
  const { filteredBookings } = useContext(BookingsContext);
  const { width } = useViewport();

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">{width < 800 ? "Id" : "BookingId"}</th>
          <th scope="col">Cliente</th>
          <th scope="col">{width < 800 ? "Fecha" : "Fecha de Creación"}</th>
          <th scope="col" style={{ width: "35%" }}>
            Dirección
          </th>
          <th scope="col">Precio</th>
        </tr>
      </thead>
      <tbody>
        {filteredBookings.map((booking) => (
          <tr key={booking.bookingId}>
            <th scope="row">{booking.bookingId}</th>
            <td>{booking.cliente}</td>
            <td>
              {booking.fechaDeCreacion.getDate() +
                "-" +
                booking.fechaDeCreacion.getMonth() +
                "-" +
                booking.fechaDeCreacion.getFullYear()}
            </td>
            <td style={{ width: "35%" }}>{booking.direccion}</td>
            <td>{booking.precio + " $"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function FilterComponent() {
  const { filterBooks, filter } = useContext(BookingsContext);

  return (
    <div className="container mt-3 mb-3">
      <div className="row">
        <div className="col-3 d-flex align-items-center">
          <span className="font-weight-bold">Filtrar:</span>
        </div>
        <div className="col-9 col-md-6 ml-md-auto d-flex align-items-center">
          <div className="input-group">
            <div
              className="btn-group"
              role="group"
              onChange={(e) => {
                filterBooks({
                  t: e.target.value,
                  q: filter.query,
                  f: filter.field,
                });
              }}
            >
              <input
                type="radio"
                className="btn-check"
                name="flterType"
                id={"lte"}
                autoComplete="off"
                defaultChecked={false}
                value={"lte"}
              />
              <label className="btn btn-outline-primary" htmlFor={"lte"}>
                {"<"}
              </label>
              <input
                type="radio"
                className="btn-check"
                name="flterType"
                id={"gte"}
                autoComplete="off"
                defaultChecked={false}
                value={"gte"}
              />
              <label className="btn btn-outline-primary" htmlFor={"gte"}>
                {">"}
              </label>
              <input
                type="radio"
                className="btn-check"
                name="flterType"
                id={"like"}
                autoComplete="off"
                defaultChecked={true}
                value={"like"}
              />
              <label className="btn btn-outline-primary" htmlFor={"like"}>
                {"like"}
              </label>
            </div>
            <input
              type="checkbox"
              className="btn-check"
              id="filterField"
              defaultChecked={true}
              autoComplete="off"
              onChange={() => {
                filterBooks({
                  t: filter.type,
                  q: filter.query,
                  f: filter.field === "#" ? "$" : "#",
                });
              }}
            />
            <label className="btn btn-outline-secondary" htmlFor="filterField">
              {filter.field}
            </label>
            <input
              type="number"
              id="filterQuery"
              className="form-control"
              autoFocus={true}
              value={filter.query}
              onChange={(e) => {
                filterBooks({
                  t: filter.type,
                  q: e.target.value,
                  f: filter.field,
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingTable() {
  const { width } = useViewport();
  const breakpoint = 620;

  return (
    <Fragment>
      <FilterComponent />
      {width < breakpoint ? <MobileComponent /> : <DesktopComponent />}
    </Fragment>
  );
}
