import React from "react";

function Reservations({ reservation }) {
  const {
    reservation_id,
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
  } = reservation;

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
      </div>
      <a href={`/reservations/${reservation_id}/seat`} className="link-dark btn btn-info">Seat</a>
    </div>
  );
}

export default Reservations;
