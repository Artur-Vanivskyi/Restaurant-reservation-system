import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { listTables, readReservation, seatReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function Seat() {
  const { reservation_id } = useParams();
  const history = useHistory();

  const [tables, setTables] = useState([]);
  const [tablesErrors, setTablesErrors] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [reservationsErrors, setReservationsErrors] = useState(null);
  const [errors, setErrors] = useState(null);
  const [tableId, setTableId] = useState("");

  useEffect(loadTables, []);

  function loadTables() {
    const abortController = new AbortController();
    listTables(abortController.signal).then(setTables).catch(setTablesErrors);
    return () => abortController.abort();
  }
  useEffect(loadReservations, [reservation_id]);
  function loadReservations() {
    const abortController = new AbortController();
    readReservation(reservation_id, abortController.signal)
      .then(setReservations)
      .catch(setReservationsErrors);
    return () => abortController.abort();
  }

  const availableTables = tables.map((table) => (
    <option key={table.table_id} value={table.table_id}>
      {table.table_id} - {table.capacity}
    </option>
  ));

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    seatReservation(reservation_id, tableId, abortController.signal)
      .then(() => history.push("/dashboard"))
      .catch((error) => setErrors(error));

    return () => abortController.abort();
  };

  const handleCancel = (event) => {
    event.preventDefault();
    history.goBack();
  };

  const handleChange = ({ target }) => {
    setTableId(target.value);
  };

  const displayErrors = errors && <ErrorAlert error={errors} />;
  return (
    <>
      <h2>Seat Reservation</h2>
      <form className="form-inline" onSubmit={handleSubmit}>
        {displayErrors}
        <h3>Available Tables: </h3>
        <select required name="table_id" onChange={handleChange}>
          <option>---Select an option---</option>
          {availableTables}
        </select>
        <button type="submit" className="btn btn-info">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>
    </>
  );
}

export default Seat;
