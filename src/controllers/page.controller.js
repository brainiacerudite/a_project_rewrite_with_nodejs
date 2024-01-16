const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");

const index = catchAsync(async (req, res) => {
  const { params } = req.body;
  res.status(httpStatus.OK).send();
});

module.exports = index;
