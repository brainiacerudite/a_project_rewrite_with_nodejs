const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");

const index = catchAsync(async (req, res) => {
  return res.status(httpStatus.OK).send();
});

const store = catchAsync(async (req, res) => {
  return res.status(httpStatus.CREATED).send();
});

module.exports = {
  index,
  store,
};
