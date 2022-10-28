import React from "react";
import { updateReservationStatus } from "../utils/api";

function Reservations({ reservation, loadDashboard }) {
  const {
    reservation_id,
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
    status,
  } = reservation;

  const handleCancel = () => {
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      const abortController = new AbortController();
      updateReservationStatus(
        { status: "cancelled" },
        reservation_id,
        abortController.signal
      )
        .then(loadDashboard)
        .catch((error) => console.log(error));

      return () => abortController.abort();
    }
  };

  return (
    <div className="card border-info mb-3" style={{ maxWidth: "20rem" }}>
      <h5 className="card-header">
        {first_name}, {last_name}
      </h5>
      <div className="card-body">
        <h5 className="card-title">{reservation_date}</h5>
        <p className="card-text">Time: {reservation_time}</p>
        <p className="card-text">Party Size: {people}</p>
        <p className="card-text">Phone Number: {mobile_number}</p>
        <p
          className="card-text"
          data-reservation-id-status={reservation.reservation_id}
        >
          Status: {status}
        </p>
      </div>
      {status === "booked" && (
        <a
          href={`/reservations/${reservation_id}/seat`}
          role="button"
          className="btn btn-info"
        >
          Seat
        </a>
      )}
      {status === "booked" && (
        <a
          href={`/reservations/${reservation_id}/edit`}
          role="button"
          className="btn btn-secondary mt-2"
        >
          Edit
        </a>
      )}
{status === "booked" &&
      <button
        data-reservation-id-cancel={reservation.reservation_id}
        className="btn btn-secondary mt-2"
        onClick={handleCancel}
      >
        Cancel
      </button>
}
    </div>
  );
}

export default Reservations;
