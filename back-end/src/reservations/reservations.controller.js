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
  const { date = today } = req.query;
  const reservation = await service.list(date);
  res.json({ data: reservation });
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

const hasRequiredProperties = hasProperties(REQUIRED_PROPERTIES);

function validPeople(req, res, next) {
  const { data: { people } = {} } = req.body;
  if (Number(people) > 0 && typeof people === "number") {
    next();
  } else {
    next({
      status: 400,
      message: "people must be greater than 0",
    });
  }
}

function validateDate(date) {
  let date_regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
  return date_regex.test(date);
}

function validateTime(time) {
  let time_regex = /^(2[0-3]|[01][0-9]):[0-5][0-9]$/;
  return time_regex.test(time);
}

async function create(req, res) {
  const data = await service.create(req.body.reservation);
  res.status(201).json({ data: data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [hasRequiredProperties, validPeople, asyncErrorBoundary(create)],
};
