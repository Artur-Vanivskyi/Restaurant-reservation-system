import React, { useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Reservations from "../dashboard/Reservations";
import { FaSearchPlus } from "react-icons/fa";
import "./search.css";

function Search() {
  const initialFormState = {
    mobile_number: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [numberVisible, setNumberVisible] = useState(false);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleFind = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations(formData, abortController.signal)
      .then(setReservations)
      .then(() => setNumberVisible(true))
      .catch(setReservationsError);

    return () => abortController.abort();
  };

  const displayReservationErrors = reservationsError && (
    <ErrorAlert error={reservationsError} />
  );

  const reservationsList = reservations.map((reservation) => (
    <Reservations
      key={reservation.reservation_id}
      reservation={reservation}
      loadReservations={handleFind}
    />
  ));

  const displayReservationByMobileNumber = reservations.length ? (
    <div className="rowlist">{reservationsList}</div>
  ) : (
    <h3 className="text-center mt-4">No reservations found</h3>
  );

  return (
    <>
      <div>{displayReservationErrors}</div>
      <form
        className="form-inline d-flex justify-content-center mt-5"
        onSubmit={handleFind}
      >
        <div className="form-group mx-sm-3 mb-2">
          <input
            name="mobile_number"
            type="search"
            className="form-control"
            id="mobile_number"
            placeholder="Enter a customer's phone number"
            onChange={handleChange}
            value={formData.mobile_number}
          />
        </div>
        <button type="submit" className="btn btn-info mb-2">
          <FaSearchPlus className="mb-1" /> {"\n"} Find
        </button>
      </form>
      <div className="visible_number">
        {numberVisible ? (
          <h4>Reservations for mobile number: {formData.mobile_number}</h4>
        ) : null}
      </div>
      {displayReservationByMobileNumber}
    </>
  );
}

export default Search;
