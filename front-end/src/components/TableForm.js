import React from "react";
import {GiCancel} from 'react-icons/gi';
import {GiConfirmed} from 'react-icons/gi';

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
          <GiConfirmed className="mb-1"/> Submit
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
          >
            < GiCancel className="mb-1" /> Cancel
          </button>
        </div>
      </form>
    </div>

    // <>
    //   <div className="text-center mt-3 mb-5">
    //     <h1>Create New Table</h1>
    //   </div>
    //   <div className="d-flex justify-content-center">
    //     <form className="w-50"onSubmit={handleSubmit}>
    //       <div className="mb-3">
    //         <label className="form-label sr-only" htmlFor="table_name">
    //           Table Name:
    //         </label>
    //         <input
    //           required
    //           type="text"
    //           placeholder="Table Name"
    //           className="form-control shadow-sm"
    //           name="table_name"
    //           onChange={handleChange}
    //           value={formData.table_name}
    //         ></input>
    //       </div>
    //       <div className="mb-3">
    //         <label className="form-label sr-only" htmlFor="capacity">
    //           Capacity:
    //         </label>
    //         <input
    //           required
    //           type="text"
    //           placeholder="Capacity"
    //           min="1"
    //           className="form-control shadow-sm"
    //           name="capacity"
    //           onChange={handleChange}
    //           value={formData.capacity}
    //         ></input>
    //       </div>
    //       <button className="btn btn-primary mx-2" type="submit">
    //         Submit
    //       </button>
    //       <button
    //         type="button"
    //         className="btn btn-secondary"
    //         onClick={handleCancel}
    //       >
    //         Cancel
    //       </button>
    //     </form>
    //   </div>
    // </>
  );
}

export default TableForm;
