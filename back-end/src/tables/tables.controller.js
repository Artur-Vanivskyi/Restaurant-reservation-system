const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const REQUIRED_PROPERTIES = ["table_name", "capacity"];

async function list(req, res, next) {
  const table = await service.list();
  res.json({ data: table });
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
  console.log("has props");
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

function hasValidValues(req, res, next) {
  const { table_name, capacity } = req.body.data;

  if (typeof capacity !== "number") {
    return next({
      status: 400,
      message: "field capacity has to be a number",
    });
  }
  if (table_name.length < 2) {
    return next({
      status: 400,
      message: "table_name must be longer than one character",
    });
  }
  if (capacity < 1) {
    return next({
      status: 400,
      message: "capacity must be more that 0",
    });
  }
  next();
}

function tableOccupied(req, res, next) {
  const occupied = res.locals.table.reservation_id;
  if (occupied) {
    return next({
      status: 400,
      message: "table is occupied",
    });
  }
  next();
}

function tableNotOccupied(req, res, next) {
    const occupied = res.locals.table.reservation_id;
    if (!occupied) {
      return next({
        status: 400,
        message: "table is not occupied",
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

async function tableExists(req, res, next) {
  const { table_id } = req.params;
  const table = await service.read(table_id);
  if (table) {
    res.locals.table = table;
    return next();
  }
  next({
    status: 404,
    message: `Table ID ${table_id} does not exist`,
  });
}

function read(req, res, next) {
  res.json({ data: res.locals.table });
}

async function create(req, res, next) {
  const table = await service.create(req.body.data);
  res.status(201).json({ data: table });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [tableExists, read],
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    hasValidValues,
    asyncErrorBoundary(create),
  ],
};