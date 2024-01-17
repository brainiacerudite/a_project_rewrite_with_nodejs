const express = require("express");
const authRoute = require("./auth.route");
const apiRoute = require("./api.route");

const router = express.Router();

router.use("/", authRoute);
router.use("/api/", apiRoute);

// router.use("/", function (req, res) {
//   res.send("Hello Again");
// });

module.exports = router;
