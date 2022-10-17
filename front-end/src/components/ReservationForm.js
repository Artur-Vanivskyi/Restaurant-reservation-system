import React from "react";

function ReservationForm({
  handleChange,
  handleCancel,
  handleSubmit,
  formData,
}) {
  return (
    <div className="mr-3 ml-3">
      <h1>Reservation</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="first_name">First Name</label>
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
        <div className="form-group">
          <label htmlFor="last_name">Last Name</label>
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
        <div className="form-group">
          <label htmlFor="mobile_number">Mobile Number</label>
          <input
            name="mobile_number"
            type="text"
            className="form-control"
            id="mobile_number"
            onChange={handleChange}
            value={formData.mobile_number}
            pattern="\d{3}[\-]\d{3}[\-]\d{4}"
            placeholder="xxx-xxx-xxxx"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="reservation_date">Reservation Date</label>
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
        <div className="form-group">
          <label htmlFor="reservation_time">Reservation Time</label>
          <input
            name="reservation_time"
            type="time"
            className="form-control"
            id="reservation_time"
            onChange={handleChange}
            value={formData.reservation_time}
            placeholder="HH:MM"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="people">Number of people</label>
          <input
            name="people"
            type="text"
            className="form-control"
            id="people"
            onChange={handleChange}
            value={formData.people}
            minLength={1}
            placeholder="# of people for party"
            required
          />
          <div className="form-group mt-3">
            <button
              type="submit"
              className="btn btn-primary mr-3"
            >
              Submit
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
