const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");

const index = catchAsync(async (req, res) => {
  res.status(httpStatus.OK).send();
});

module.exports = index;
