import React from "react";
import { unseatTable } from "../utils/api";
import {MdDone} from 'react-icons/md'

function Tables({ table, loadDashboard }) {
  const { table_name, capacity, table_id, reservation_id } = table;

  const handleFinish = (event) => {
    
    event.preventDefault();
    if (window.confirm("Is this table ready to seat new guests?") === true) {
      unseatTable(table_id)
        .then(() => loadDashboard())
        .catch((error) => console.log("error", error));
    }
  };

  return (
    <div className="card mb-3 shadow-sm">
      <h5 className="card-header">Table Name: {table_name}</h5>
      <div className="card-body">
        <div className="container">
          <div className="row d-flex">
            <h5 className="col card-title mb-0 justify-content-center align-self-center">
              Capacity: {capacity}
            </h5>
            {table.reservation_id ? (
              <>
                <div
                  className="col btn border border-dark rounded text-dark mr-2"
                  data-table-id-status={table.table_id}
                  style={{ cursor: "default" }}
                >
                  Occupied
                </div>
              </>
            ) : (
              <div
                className="col btn border border-success rounded"
                data-table-id-status={table.table_id}
                style={{ cursor: "default" }}
              >
                Free
              </div>
            )}
            {table.reservation_id ? (
              <button
                type="button"
                data-table-id-finish={table.table_id}
                className="btn btn-info"
                onClick={handleFinish}
              >
                <MdDone /> Finish
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tables;
