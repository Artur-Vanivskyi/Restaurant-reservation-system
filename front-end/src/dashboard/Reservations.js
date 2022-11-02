import React from "react";
import { updateReservationStatus } from "../utils/api";


function Reservations({ reservation, loadReservations}) {
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

  const handleCancel = (event) => {
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
        .then(()=> loadReservations(event))
        .catch((error) => console.log(error));

      return () => abortController.abort();
    }
  };

  return (
    <div className="card border-info mb-4 mr-3 col-4 p-0" style={{ maxWidth: "30rem"}}>
      <h5 className="card-header">
        Reservation for: {first_name}, {last_name}
      </h5>
      <div className="card-body">
        <h5 className="card-title">Reservation date: {reservation_date}</h5>
        <p className="card-text">
          <b>Time:</b> {reservation_time}
        </p>
        <p className="card-text">
          <b>Party Size:</b> {people}
        </p>
        <p className="card-text">
          <b>Phone Number:</b> {mobile_number}
        </p>
        <p
          className="card-text"
          data-reservation-id-status={reservation.reservation_id}
        >
          <b>Status:</b> {status}
        </p>
      </div>
      <div className="card-footer">
        <div className="d-flex justify-content-end">
          <div className="mr-3">
            {status === "booked" && (
              <a
                href={`/reservations/${reservation_id}/seat`}
                role="button"
                className="btn btn-info"
              >
                <span className="oi oi-circle-check"></span> Seat
              </a>
            )}
          </div>
          <div className="mr-3">
            {status === "booked" && (
              <a
                href={`/reservations/${reservation_id}/edit`}
                role="button"
                className="btn btn-secondary"
              >
                <span className="oi oi-pencil"></span> Edit
              </a>
            )}
          </div>
          <div>
            {status === "booked" && (
              <button
                data-reservation-id-cancel={reservation.reservation_id}
                className="btn btn-secondary"
                onClick={handleCancel}
              >
               <span className="oi oi-circle-x"></span> Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reservations;
