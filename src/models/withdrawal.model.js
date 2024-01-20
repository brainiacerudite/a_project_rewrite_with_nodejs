const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = Schema({});

const Withdrawal = mongoose.model("Withdrawal", schema);
module.exports = Withdrawal;
