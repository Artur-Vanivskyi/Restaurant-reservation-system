import React from "react";
import {GiCancel} from 'react-icons/gi';
import {GiConfirmed} from 'react-icons/gi';

function ReservationForm({
  handleChange,
  handleCancel,
  handleSubmit,
  formData,
}) {
  return (
    <div className="container" style={{ width: "60%" }}>
      <h1 style={{textAlign:"center"}} className="mb-3">New Reservation</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <label className="col-sm-2" htmlFor="first_name">
            First Name
          </label>
          <div className="col-sm-10">
            <input
              name="first_name"
              type="text"
              className="form-control"
              id="first_name"
              onChange={handleChange}
              value={formData.first_name}
              placeholder="Enter first name"
              required
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2" htmlFor="last_name">
            Last Name
          </label>
          <div className="col-sm-10">
            <input
              name="last_name"
              type="text"
              className="form-control"
              id="last_name"
              onChange={handleChange}
              value={formData.last_name}
              placeholder="Enter last name"
              required
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2" htmlFor="mobile_number">
            Mobile Number
          </label>
          <div className="col-sm-10">
            <input
              name="mobile_number"
              type="text"
              className="form-control"
              id="mobile_number"
              onChange={handleChange}
              value={formData.mobile_number}
              // pattern="\d{3}[\-]\d{3}[\-]\d{4}"
              placeholder="xxx-xxx-xxxx"
              required
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2" htmlFor="reservation_date">
            Reservation Date
          </label>
          <div className="col-sm-10">
            <input
              name="reservation_date"
              type="date"
              className="form-control"
              id="reservation_date"
              onChange={handleChange}
              value={formData.reservation_date}
              placeholder="YYYY-MM-DD"
              required
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2" htmlFor="reservation_time">
            Reservation Time
          </label>
          <div className="col-sm-10">
            <input
              name="reservation_time"
              type="time"
              className="form-control"
              id="reservation_time"
              onChange={handleChange}
              value={formData.reservation_time}
              placeholder="HH:MM"
              step="60"
              required
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2" htmlFor="people">
            Number of people
          </label>
          <div className="col-sm-10">
            <input
              name="people"
              type="number"
              className="form-control"
              id="people"
              onChange={handleChange}
              value={formData.people}
              min="1"
              placeholder="# of people for party"
              required
            />
          </div>
        </div>
        <div className="form-group mt-3 mb-4 d-flex justify-content-end">
        <button type="submit" className="btn btn-info mr-3">
          <GiConfirmed className="mb-1"/> Submit
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleCancel}
        >
          < GiCancel className="mb-1" /> Cancel
        </button>
      </div>
      </form>
      
    </div>
  );
}

export default ReservationForm;
