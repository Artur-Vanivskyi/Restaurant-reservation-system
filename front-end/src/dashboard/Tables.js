import React from "react";

function Tables({ table }) {
  const { table_name, capacity } = table;

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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tables;
