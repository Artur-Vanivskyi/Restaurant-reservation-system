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

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
  "status",
  "reservation_id",
  "created_at",
  "updated_at",
];


async function list(req, res) {
  //const today = new Date().toLocaleDateString().replaceAll("/", "-");
  const { date, mobile_number } = req.query;
  const reservation = await (mobile_number
    ? service.search(mobile_number)
    : service.list(date));
  res.json({ data: reservation });
}

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;
  const invalidStatuses = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );
  if (invalidStatuses.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidStatuses.join(", ")}`,
    });
  }
  next();
}

function hasProperties(...properties) {
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
      next(error);
    }
  };
}

const hasRequiredProperties = hasProperties(...REQUIRED_PROPERTIES);
const hasValidPropertiesForUpdate = hasProperties(VALID_PROPERTIES);

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

function reservationEligibleTime(timeString) {
  let openTime = "10:30";
  let closingTime = "21:30";
  return timeString <= closingTime && timeString >= openTime;
}

function hasValidValues(req, res, next) {
  const { reservation_date, reservation_time, people } = req.body.data;
  // console.log("line 122", status)
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

function validStatus(req, res, next) {
  const { status } = req.body.data;
  const VALID_STATUSES = ["booked", "seated", "finished"];
  if (VALID_STATUSES.includes(status)) {
    return next();
  }
  next({
    status: 400,
    message: "Status is unknown",
  });
}

function statusIsBooked(req, res, next) {
  const { data = {} } = req.body;
  const status = data.status;
  if (status && status !== "booked") {
    return next({
      status: 400,
      message: `Invalid status: ${status}`,
    });
  }
  next();
}

function statusNotFinished(req, res, next) {
  const { status } = res.locals.reservation;
  if (status === "finished") {
    return next({
      status: 400,
      message: "A finished reservation cannot be updated",
    });
  }
  next();
}

function read(req, res, next) {
  res.status(200).json({ data: res.locals.reservation });
}

async function create(req, res) {
  const reservation = await service.create(req.body.data);
  res.status(201).json({ data: reservation });
}

async function update(req, res, next) {
  const updatedReservation = {
    ...req.body.data,
    reservation_id: res.locals.reservation.reservation_id,
  };
  const reservation = await service.update(updatedReservation);
  res.json({ data: reservation });
}

async function updateStatus(req, res, next) {
  const { reservation_id } = req.params;
  const { status } = req.body.data;
  console.log("status", status);
  const data = await service.updateStatus(reservation_id, status);
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(reservationExists), read],
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    hasValidValues,
    statusIsBooked,
    asyncErrorBoundary(create),
  ],
  update: [
    asyncErrorBoundary(reservationExists),
    hasValidPropertiesForUpdate,
    hasValidValues,
    validStatus,
    asyncErrorBoundary(update),
  ],
  updateStatus: [
    asyncErrorBoundary(reservationExists),
    validStatus,
    statusNotFinished,
    asyncErrorBoundary(updateStatus),
  ],
};
