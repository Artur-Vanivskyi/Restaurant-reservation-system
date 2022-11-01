import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { listTables, readReservation, seatReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { GiCancel } from "react-icons/gi";
import { GiConfirmed } from "react-icons/gi";

function Seat() {
  const { reservation_id } = useParams();

  const history = useHistory();

  const [tables, setTables] = useState([]);
  const [tablesErrors, setTablesErrors] = useState(null);
  const [reservation, setReservations] = useState([]);
  const [reservationsErrors, setReservationsErrors] = useState(null);

  const [tableId, setTableId] = useState("");

  useEffect(loadReservations, [reservation_id]);

  function loadReservations() {
    const abortController = new AbortController();
    setReservationsErrors(null);
    setTablesErrors(null);
    readReservation(reservation_id, abortController.signal)
      .then(setReservations)
      .catch(setReservationsErrors);
    listTables(abortController.signal).then(setTables).catch(setTablesErrors);
    return () => abortController.abort();
  }

  const availableTables = tables.map((table) => (
    <option key={table.table_id} value={table.table_id}>
      {table.table_name} - {table.capacity}
    </option>
  ));

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    seatReservation(reservation_id, tableId, abortController.signal)
      .then(() => history.push("/dashboard"))
      .catch((error) => setTablesErrors(error));

    return () => abortController.abort();
  };

  const handleCancel = (event) => {
    event.preventDefault();
    history.goBack();
  };

  const handleChange = ({ target }) => {
    setTableId(target.value);
  };

  //const displayErrors = errors && <ErrorAlert error={errors} />;

  return (
    <div className="container">
      <div className="row justify-content-center mb-3">
        <h2>Seat Reservation</h2>
      </div>
      <div className="row justify-content-center mb-3">
        <div
          className="card border-info mb-4 mr-3 col-4 p-0"
          style={{ maxWidth: "30rem" }}
        >
          <h5 className="card-header">
            Reservation for: {reservation.first_name}, {reservation.last_name}
          </h5>
          <div className="card-body">
            <h5 className="card-title">
              Reservation date: {reservation.reservation_date}
            </h5>
            <p className="card-text">
              <b>Time:</b> {reservation.reservation_time}
            </p>
            <p className="card-text">
              <b>Party Size:</b> {reservation.people}
            </p>
            <p className="card-text">
              <b>Phone Number:</b> {reservation.mobile_number}
            </p>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <ErrorAlert error={reservationsErrors} />
        <ErrorAlert error={tablesErrors} />

        <form className="form-inline" onSubmit={handleSubmit}>
          <h3>Available Tables: </h3>
          <div className="mr-3 ml-2">
            <select required name="table_id" onChange={handleChange}>
              <option>---Select an option---</option>
              {availableTables}
            </select>
          </div>
          <div>
            <button type="submit" className="btn btn-info mr-3">
              <GiConfirmed className="mb-1" /> Submit
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              <GiCancel className="mb-1" /> Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Seat;
