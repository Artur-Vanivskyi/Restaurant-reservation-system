import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";
import { createReservation } from "../utils/api";

function CreateReservation() {
  const history = useHistory();

  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
    status: "booked",
  };

  const [formData, setFormData] = useState({ ...initialFormState });
  const [formErrors, setFormErrors] = useState([]);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleCancel = (event) => {
    history.goBack();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    setFormErrors([])
    const formDataFormated = { ...formData, people: Number(formData.people) };

    //---------------- Validation for fronend to deisplay double message-------------------//

    function dateNotTuesday(dateString) {
      const date = new Date(dateString);
      return date.getUTCDay() !== 2;
    }

    function dateNotInPast(dateString, timeString) {
      const today = new Date();
      const reservationDate = new Date(dateString + "T" + timeString);
      return reservationDate > today;
    }

    function reservationEligibleTime(timeString) {
      let openTime = "10:30";
      let closingTime = "21:30";
      return timeString <= closingTime && timeString >= openTime;
    }

    const errors = [];

    if (!dateNotTuesday(formData.reservation_date)) {
      errors.push({ message: "The restaurant is closed on Tuesday" });
    }
    if (!dateNotInPast(formData.reservation_date, formData.reservation_time)) {
      errors.push({
        message: "You must do reservation for future date or time",
      });
    }
    if (!reservationEligibleTime(formData.reservation_time)) {
      errors.push({
        message: "Reservation time must be between 10:30 AM and 9:30 PM",
      });
    }
    if (formData.people < 1) {
      errors.push({message: "# of people must be greater than 1"})
    }

    setFormErrors(errors);
console.log(formErrors)
    createReservation(formDataFormated, abortController.signal)
      .then(()=> {
        history.push(`/dashboard?date=${formData.reservation_date}`)})
      .catch((err) => console.log(err));

    return () => abortController.abort();
  };

  let displayErrors = formErrors.map((error) => (
<ErrorAlert key={error.message} error={error} />
  ))

  return (
    <div>
      {displayErrors}
      <h1 style={{ textAlign: "center" }} className="mb-3">
        New Reservation
      </h1>
      <ReservationForm
        handleChange={handleChange}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
        formData={formData}
      />
    </div>
  );
}

export default CreateReservation;
