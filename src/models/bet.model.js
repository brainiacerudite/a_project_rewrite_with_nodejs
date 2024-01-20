const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = Schema({});

const Bet = mongoose.model("Bet", schema);
module.exports = Bet;
