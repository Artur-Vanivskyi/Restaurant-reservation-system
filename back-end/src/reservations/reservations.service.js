const knex = require("../db/connection");

function list(reservation_date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date })
    .whereNot({status: "finished"})
    .orderBy("reservation_time");
}

function read(reservation_id) {
  // console.log("ID service", reservation_id);
  return knex("reservations").select("*").where({ reservation_id }).first();
}

function create(reservation) {
  return knex("reservations")
    .insert(reservation, "*")
    .then((createdReservation) => createdReservation[0]);
}

function update(updatedReservation) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation, "*")
    .then((updatedRecord) => updatedRecord[0]);
}

function updateStatus(reservation_id, status) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id })
    .update({ status })
    .returning("*")
    .then((updatedReservation) => updatedReservation[0]);
}

module.exports = {
  list,
  create,
  read,
  update,
  updateStatus,
};
