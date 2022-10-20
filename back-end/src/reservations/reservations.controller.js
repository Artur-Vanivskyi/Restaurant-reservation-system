/**
 * List handler for reservation resources
 */
const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const REQUIRED_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

async function list(req, res) {
  const today = new Date().toLocaleDateString().replaceAll("/", "-");
  const reservation = await service.list(
    req.query.date ? req.query.date : today
  );
  res.json({ data: reservation });
}

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;
  const invalidStatuses = Object.keys(data).filter(
    (field) => !REQUIRED_PROPERTIES.includes(field)
  );
  if (invalidStatuses.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidStatuses.join(", ")}`,
    });
  }
  next();
}

function hasProperties(properties) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    try {
      properties.forEach((property) => {
        if (!data[property]) {
          const error = new Error(`A '${property}' property is required.`);
          error.status = 400;
          throw error;
        }
      });
      next();
    } catch (error) {
      console.log("-----------", error);
      next(error);
    }
  };
}

const hasRequiredProperties = hasProperties(REQUIRED_PROPERTIES);

// function validPeople(req, res, next) {
//   const { data: { people } = {} } = req.body;
//   const numberPeople = Number(people);
//   console.log("PEOPLE", people, typeof numberPeople);
//   //problem with typeof line 70 number
//   if (numberPeople > 0 && typeof numberPeople === "number") {
//     next();
//   } else {
//     next({
//       status: 400,
//       message: "people must be a number greater than 0",
//     });
//   }
// }

const dateFormat = /^\d\d\d\d-\d\d-\d\d$/;
const timeFormat = /^\d\d:\d\d$/;

function dateIsValid(dateString) {
  return dateString.match(dateFormat)?.[0];
}

function timeIsValid(timeString) {
  return timeString.match(timeFormat)?.[0];
}

function dateNotTuesday(dateString) {
  const date = new Date(dateString);
  return date.getUTCDay() !== 2;
}

function dateNotInPast(dateString, timeString) {
  const today = new Date();
  const reservationDate = new Date(dateString + "T" + timeString);
  return reservationDate > today;
}

//before 10:30 am
// after 9:30 pm
// hours and minutes
// reservation_time
//const [hours, minutes] = reservation_time

function reservationEligibleTime(timeString) {
  let openTime = "10:30";
  let closingTime = "21:30";
  return timeString <= closingTime && timeString >= openTime;
}

function hasValidValues(req, res, next) {
  const { reservation_date, reservation_time, people } = req.body.data;

  if (!timeIsValid(reservation_time)) {
    return next({
      status: 400,
      message: "reservation_time must be in HH:MM:SS format",
    });
  }
  if (!dateIsValid(reservation_date)) {
    return next({
      status: 400,
      message: "reservation_date must be in YYYY-MM-DD format",
    });
  }
  if (typeof people !== "number") {
    return next({
      status: 400,
      message: "people must be a number",
    });
  }
  if (people < 1) {
    return next({
      status: 400,
      message: "# of people must be greater than 1",
    });
  }
  if (!dateNotTuesday(reservation_date)) {
    return next({
      status: 400,
      message: "The restaurant is closed on Tuesday",
    });
  }
  if (!dateNotInPast(reservation_date, reservation_time)) {
    return next({
      status: 400,
      message: "You must do reservation for future date or time",
    });
  }
  if (!reservationEligibleTime(reservation_time)) {
    return next({
      status: 400,
      message: "Reservation time must be between 10:30 AM and 9:30 PM",
    });
  }
  next();
}

async function reservationExists(req, res, next) {
  const { reservation_id } = req.params;
  const reservation = await service.read(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation ID ${reservation_id} does not exist`,
  });
}

function read(req, res, next) {
  res.status(201).json(res.locals.reservation);
}

async function create(req, res) {
  const reservation = await service.create(req.body.data);
  res.status(201).json({ data: reservation });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [reservationExists, read],
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    hasValidValues,
    asyncErrorBoundary(create),
  ],
};
