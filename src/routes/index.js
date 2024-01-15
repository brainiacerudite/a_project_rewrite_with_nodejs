const express = require("express");
const authRoute = require("./auth.route");
const apiRoute = require("./api.route");

const router = express.Router();

router.use("/", function (req, res) {
  res.send("Hello Again");
});

router.use("/", authRoute);

module.exports = router;
