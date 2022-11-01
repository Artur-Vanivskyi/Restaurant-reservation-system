import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import Reservations from "./Reservations";
import { previous, next, today } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import Tables from "./Tables";

import { GrPrevious, GrNext } from "react-icons/gr";
import { MdToday } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";

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
    <Reservations
      key={reservation.reservation_id}
      loadReservations={loadDashboard}
      reservation={reservation}
    />
  ));

  const displayTables = tables.map((table, index) => (
    <Tables key={index} table={table} loadDashboard={loadDashboard} />
  ));

  return (
    <main>
      <div className="d-flex flex-column align-items-center bd-highlight mb-3">
        <div className="p-1 bd-highlight ">
          <h1>Dashboard</h1>
        </div>
        <div className="p-1 bd-highlight">
          <button
            type="button"
            className="btn btn-info mr-3"
            onClick={handlePrevious}
          >
            <GrPrevious className="mb-1" />
            {"\n"}
            Previous
          </button>
          <button
            type="button"
            className="btn btn-info mr-3"
            onClick={handleToday}
          >
            Today{"\n"}
            <MdToday />
          </button>
          <button type="button" className="btn btn-info" onClick={handleNext}>
            Next {"\n"}
            <GrNext className="mb-1" />
          </button>
        </div>
        <div className="p-2 bd-highlight ">
          <h3 className="mb-0">Reservations for date {date}</h3>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <h2 className="row justify-content-center">
              Reservation List
              <BsCheckLg className="ml-3" />
            </h2>
            <ErrorAlert error={reservationsError} />
            {reservations.length === 0 && (
              <h4 className="alert alert-info" role="alert">
            No reservations found on date: {date}
            </h4>
            )}
            {displayedReservations}
          </div>
          <div className="col-sm-6">
            <h2 className="row justify-content-center">
              Table List <FaCheckCircle className="ml-3" />
            </h2>
            <ErrorAlert error={tablesErrors} />
            {displayTables}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
