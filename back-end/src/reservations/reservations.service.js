const knex = require("../db/connection");

function list(date){
    return knex("reservations")
    .select("*")
    .where({reservation_date: date.toString()})
    .orderBy("reservation_time");
}

function create(reservation){
    return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdReservation) => createdReservation[0]);
}

module.exports = {
    list,
    create,
}