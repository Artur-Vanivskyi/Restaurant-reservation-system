import React from "react";

function TableForm({ handleCancel, handleChange, handleSubmit, formData }) {
  return (
    <div className="container" style={{ width: "45%" }}>
      <h1 style={{ textAlign: "center" }} className="mb-3">
        New Table
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <label className="col-sm-2" htmlFor="table_name">
            TableName
          </label>
          <div className="col-sm-10">
            <input
              required
              type="text"
              placeholder="Table Name"
              className="form-control shadow-sm"
              name="table_name"
              onChange={handleChange}
              value={formData.table_name}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2" htmlFor="capacity">
            Capacity
          </label>
          <div className="col-sm-10">
            <input
              required
              type="text"
              placeholder="Capacity"
              min="1"
              className="form-control shadow-sm"
              name="capacity"
              onChange={handleChange}
              value={formData.capacity}
            />
          </div>
        </div>
        <div className="form-group mt-3 mb-4 d-flex justify-content-end">
          <button className="btn btn-info mx-2" type="submit">
          <span className="oi oi-circle-check"></span> Submit
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
          >
            <span className="oi oi-circle-x mr-1"></span> Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default TableForm;
