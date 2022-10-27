import React, { useEffect, useState } from "react";
import { listReservations, listTables, unseatTable } from "../utils/api";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import Reservations from "./Reservations";
import { previous, next, today } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import Tables from "./Tables";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesErrors, setTablesErrors] = useState(null);

  const query = useQuery();
  const dateQuery = query.get("date");
  const [pageDate, setPageDate] = useState(dateQuery ? dateQuery : date);

  const history = useHistory();

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables(abortController.signal).then(setTables).catch(setTablesErrors);
    return () => abortController.abort();
  }
 

  const handleNext = () => {
    setPageDate(next(pageDate));
    history.push(`/dashboard?date=${next(pageDate)}`);
  };

  const handlePrevious = () => {
    setPageDate(previous(pageDate));
    history.push(`/dashboard?date=${previous(pageDate)}`);
  };

  const handleToday = () => {
    setPageDate(today(date));
    history.push(`/dashboard?date=${today(date)}`);
  };

  const displayedReservations = reservations.map((reservation) => (
    <Reservations key={reservation.reservation_id} reservation={reservation} />
  ));

  const displayTables = tables.map((table, index) => (
    <Tables key={index} table={table} loadDashboard={loadDashboard} />
  ));

  return (
    <main>
      <h1>Dashboard</h1>
      <div>
        <button
          type="button"
          className="btn btn-secondary mr-3"
          onClick={handlePrevious}
        >
          Previous
        </button>
        <button
          type="button"
          className="btn btn-secondary mr-3"
          onClick={handleToday}
        >
          Today
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date {date}</h4>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <ErrorAlert error={reservationsError} />
            {displayedReservations}
          </div>

          <div className="col-sm-6">
            <ErrorAlert error={tablesErrors} />
            {displayTables}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
