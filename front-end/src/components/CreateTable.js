import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import TableForm from "./TableForm";
import ErrorAlert from "../layout/ErrorAlert";

function CreateTable() {
  const initialFormState = {
    table_name: "",
    capacity: "",
  };

  const history = useHistory();

  const [formData, setFormData] = useState({ ...initialFormState });
  const [tableErrors, setTableErrors] = useState(null);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
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
      setTableErrors(err)
    }

    return () => abortController.abort();
  };

  return (
    <>
    <TableForm
      handleCancel={handleCancel}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      formData={formData}
    />
    <ErrorAlert error={tableErrors} />
    </>
  );
}

export default CreateTable;
