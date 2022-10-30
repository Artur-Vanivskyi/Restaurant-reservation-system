import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { readReservation, updateReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";

function EditReservation() {
  const history = useHistory();
  const { reservation_id } = useParams();

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

  useEffect(() => {
    loadReservations()
  }, [reservation_id]);

  async function loadReservations() {
    const abortController = new AbortController();
    try {
      const reservation = await readReservation(
        reservation_id,
        abortController.signal
      );
      setFormData(reservation);
    } catch (error) {
      setFormErrors(error);
    }
    return () => abortController.abort();
  }

  const formDataFormated = { ...formData, people: Number(formData.people) };

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    updateReservation(formDataFormated, reservation_id, abortController.signal)
      .then(() =>
        history.push(`/dashboard?date=${formDataFormated.reservation_date}`)
      )
      .catch(setFormErrors);
    return () => abortController.abort();
  };

  const handleCancel = (event) => {
    history.goBack();
  };

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const displayErrors = formErrors && <ErrorAlert error={formErrors} />;

  return (
    <>
      {displayErrors}
      <ReservationForm
        handleChange={handleChange}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
        formData={formData}
      />
    </>
  );
}

export default EditReservation;
