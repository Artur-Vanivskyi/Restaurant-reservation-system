const knex = require("../db/connection");

function list() {
  return knex("tables").select("*").orderBy("table_name");
}

function read(table_id) {
  return knex("tables").select("*").where({ table_id }).first();
}

function create(table) {
  return knex("tables")
    .insert(table, "*")
    .then((createdTable) => createdTable[0]);
}

function seat(reservation_id, table_id) {
  console.log("resId", reservation_id);
  console.log("tabId", table_id);
  return knex.transaction(function (trx) {
    return trx("tables")
      .where({ table_id })
      .update({ reservation_id })
      .returning("*")
      .then((updatedTable) => updatedTable[0])
      .then((updatedTable) => {
        return trx("reservations")
          .where({ reservation_id: updatedTable.reservation_id })
          .update({ status: "seated" })
          .returning("*")
          .then((updatedReservation) => updatedReservation[0]);
      });
  });
}

function unseat({ table_id, reservation_id }) {
  return knex.transaction(function (trx) {
    return trx("tables")
      .where({ table_id: table_id })
      .update({ reservation_id: null })
      .returning("*")
      .then((updated) => updated[0])
      .then((updated) => {
        return trx("reservations")
          .where({ reservation_id })
          .update({ status: "finished" });
      });
  });
}

module.exports = {
  list,
  read,
  create,
  seat,
  unseat,
};
