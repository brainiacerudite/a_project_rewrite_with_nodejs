const httpStatus = require("http-status");

function index(req, res) {
  return res.statusCode(httpStatus.OK);
}

function update(req, res) {
  // validation

  // save edited data

  return res.statusCode(httpStatus.OK);
}

function destory(req, res) {
  // delete user
  return res.statusCode(httpStatus.OK);
}

module.exports = {
  index,
  update,
  destory,
};
