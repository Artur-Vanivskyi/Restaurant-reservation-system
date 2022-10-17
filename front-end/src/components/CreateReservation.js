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
  const [errors, setErrors] = useState([]);

  

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
    
    //const abortController = new AbortController();
    //setErrors([])
    await createReservation(formData);
    history.push(`/dashboard?date=${formData.reservation_date}`);

    //return () => abortController.abort();
  };

    let displayErrors = errors.map((error) => <ErrorAlert error={error} />);

  return (
    <div>
      {errors.length ? displayErrors : null}
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
