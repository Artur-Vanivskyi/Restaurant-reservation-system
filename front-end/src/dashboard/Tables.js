import React, { useState } from "react";
// import { unseatTable } from "../utils/api";

function Tables({ table, onFinish }) {
  const { table_name, capacity, table_id, reservation_id } = table;
  const [errors, setErrors] = useState(null);

  const handleFinish = (event) => {
    console.log("handleFinish")
    event.preventDefault();
    try {
      if (
        window.confirm(
          "Is this table ready to seat new guests? This cannot be undone"
        )
      ) {
        // unseatTable(table_id, reservation_id);
        onFinish(table_id, reservation_id);
        // console.log("onFinish")
        // console.log(table_id, reservation_id)
      }
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div
      className="card mb-3 shadow-sm"
      // style={{ height: "18rem" }}
    >
      <h5 className="card-header">Table Name: {table_name}</h5>
      <div className="card-body">
        <div className="container">
          <div className="row d-flex">
            <h5 className="col card-title mb-0 justify-content-center align-self-center">
              Capacity: {capacity}
            </h5>
            {/* {table.reservation_id ? "Occupied" : "Free"} */}
            {table.reservation_id ? (
              <>
                <div
                  className="col btn border border-warning rounded text-warning"
                  data-table-id-status={table.table_id}
                  style={{ cursor: "default" }}
                >
                  Occupied
                </div>
              </>
            ) : (
              <div
                className="col btn border border-success rounded text-success"
                data-table-id-status={table.table_id}
                style={{ cursor: "default" }}
              >
                Free
              </div>
            )}
            {
            table.reservation_id ? 
            (<button
              type="button"
              data-table-id-finish={table.table_id}
              className="btn btn-success"
              onClick={handleFinish}
            >
              Finish
            </button>) : (null) 
            }
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tables;
