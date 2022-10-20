const knex = require("../db/connection");

function list(reservation_date){
    
    return knex("reservations")
    .select("*")
    .where({reservation_date})
    .orderBy("reservation_time");
}

function read(reservation_id){
    return knex("reservations")
        .select("*")
        .where({ reservation_id })
        .first()
}

function create(reservation){
    return knex("reservations")
    .insert(reservation, "*")
    .then((createdReservation) => createdReservation[0]);
}

module.exports = {
    list,
    create,
    read,
}