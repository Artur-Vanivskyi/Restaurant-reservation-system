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

    const formDataFormated = { ...formData, people: Number(formData.people) };
    try {
      await createReservation(formDataFormated, abortController.signal);
      history.push(`/dashboard?date=${formData.reservation_date}`);
    } catch (err) {
      setFormErrors(err);
    }

    return () => abortController.abort();
  };
  
  let displayErrors = formErrors && <ErrorAlert error={formErrors} />;

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
