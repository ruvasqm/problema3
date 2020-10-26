import React, { useState, useEffect, createContext } from "react";

export const BookingsContext = createContext();

const BookingsContextProvider = (props) => {
  const [filter, setFilter] = useState({
    type: "like",
    query: "",
    field: "#",
  });
  const filterBooks = ({ t, q, f }) => {
    setFilter({ type: t, query: q, field: f });
  };

  const [bookings, setBookings] = useState([]);
  const setBooks = (arr) => {
    setBookings(arr);
  };
  const [filteredBookings, setFilteredBookings] = useState([]);

  function filterBookings() {
    if (filter.query === "") setFilteredBookings(bookings);
    else {
      switch (filter.type) {
        case "gte":
          setFilteredBookings(
            bookings.filter(
              (booking) =>
                parseFloat(
                  booking[filter.field === "#" ? "bookingId" : "precio"]
                ) >= parseFloat(filter.query)
            )
          );
          break;
        case "lte":
          setFilteredBookings(
            bookings.filter(
              (booking) =>
                parseFloat(
                  booking[filter.field === "#" ? "bookingId" : "precio"]
                ) <= parseFloat(filter.query)
            )
          );
          break;
        default:
          setFilteredBookings(
            bookings.filter((booking) =>
              booking[filter.field === "#" ? "bookingId" : "precio"]
                .toString()
                .startsWith(filter.query.toString())
            )
          );
          break;
      }
    }
  }

  useEffect(() => {
    filterBookings();
  }, [bookings, filter]);

  return (
    <BookingsContext.Provider
      value={{ setBooks, filterBooks, filteredBookings, filter }}
    >
      {props.children}
    </BookingsContext.Provider>
  );
};

export default BookingsContextProvider;
