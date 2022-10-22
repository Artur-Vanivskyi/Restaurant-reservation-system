import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import TableForm from "./TableForm";

function CreateTable() {
  const initialFormState = {
    table_name: "",
    capacity: "",
  };

  const history = useHistory();

  const [formData, setFormData] = useState({ ...initialFormState });
  // const [formErrors, setFormErrors] = useState(null);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
    console.log(formData)
  };

  const handleCancel = () => {
    history.goBack();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    const formDataFormated = {
      ...formData,
      capacity: Number(formData.capacity),
    };

    try {
      await createTable(formDataFormated, abortController.signal);
      history.push("/dashboard");
    } catch (err) {
      console.log(err);
    }

    return () => abortController.abort();
  };

  return (
    <TableForm
      handleCancel={handleCancel}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      formData={formData}
    />
  );
}

export default CreateTable;
