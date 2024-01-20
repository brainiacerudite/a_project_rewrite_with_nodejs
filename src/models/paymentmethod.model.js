const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = Schema({});

const PaymentMethod = mongoose.model("PaymentMethod", schema);
module.exports = PaymentMethod;
