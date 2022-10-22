import React from "react";

function TableForm({ handleCancel, handleChange, handleSubmit, formData }) {
  return (
    <>
      <div className="text-center mt-3 mb-5">
        <h1>Create New Table</h1>
      </div>
      <div className="d-flex justify-content-center">
        <form className="w-50" noValidate={true} onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label sr-only" htmlFor="table_name">
              Table Name:
            </label>
            <input
              required
              type="text"
              placeholder="Table Name"
              className="form-control shadow-sm"
              name="table_name"
              onChange={handleChange}
              value={formData.table_name}
            ></input>
          </div>
          <div className="mb-3">
            <label className="form-label sr-only" htmlFor="capacity">
              Capacity:
            </label>
            <input
              required
              type="text"
              placeholder="Capacity"
              min="1"
              className="form-control shadow-sm"
              name="capacity"
              onChange={handleChange}
              value={formData.capacity}
            ></input>
          </div>
          <button className="btn btn-primary mx-2" type="submit">
            Submit
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
}

export default TableForm;
