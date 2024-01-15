const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");

const index = catchAsync(async (req, res) => {
  res.status(httpStatus.OK).send("user details");
});

const update = catchAsync(async (req, res) => {
  res.status(httpStatus.OK).send();
});

const destory = catchAsync(async (req, res) => {
  return res.status(httpStatus.OK).send();
});

module.exports = {
  index,
  update,
  destory,
};
