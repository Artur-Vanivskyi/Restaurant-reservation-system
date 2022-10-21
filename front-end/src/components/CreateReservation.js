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
  };

  const [formData, setFormData] = useState({ ...initialFormState });
  const [formErrors, setFormErrors] = useState(null);

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
    // setFormErrors([]);
    // const reservationDate = new Date(
    //   `${formData.reservation_date}T${formData.reservation_time}`
    // );

    // const errors = [];

    // if (reservationDate < new Date()) {
    //   errors.push({
    //     message: "Reservation must be for future date",
    //   });
    // }

    // if (reservationDate.getUTCDay() === 2) {
    //   errors.push({
    //     message: "Restaurant is closed on Tuesday",
    //   });
    // }
    // console.log(errors);
    // setFormErrors(errors);

    const formDataFormated = { ...formData, people: Number(formData.people) };
      try {
        await createReservation(formDataFormated, abortController.signal);
        history.push(`/dashboard?date=${formData.reservation_date}`);
      } catch (err) {
        setFormErrors(err)
      }
    

    return () => abortController.abort();
  };
console.log(formErrors)
  let displayErrors = formErrors && <ErrorAlert error={formErrors} />
  

  return (
    <div>
      {displayErrors}
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
