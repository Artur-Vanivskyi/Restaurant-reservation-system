const { where } = require("../db/connection");
const knex = require("../db/connection");

function list() {
  return knex("tables").select("*").orderBy("table_name");
}

function read(table_id) {
  return knex("tables").select("*").where({ table_id }).first();
  console.log("readId", table_id)
}

function create(table) {
  return knex("tables")
    .insert(table, "*")
    .then((createdTable) => createdTable[0]);
}

// function update(table){
//   return knex("tables")
//   .where({table_id: table.table_id})
//   .update(table)
//   .returning("*")
//   .then((updatedTable) => updatedTable[0])
// }

function seat(reservation_id, table_id) {
  // console.log("resId", reservation_id)
  console.log("tabId", table_id)
  return knex.transaction(function (trx) {
    return trx("tables")
      .where({ table_id })
      .update({ reservation_id })
      .returning("*")
      .then((updated) => updated[0])
  });
}

module.exports = {
  list,
  read,
  create,
  seat,
  // update,
};
