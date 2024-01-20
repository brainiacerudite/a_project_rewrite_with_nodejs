const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = Schema({});

const Faq = mongoose.model("Faq", schema);
module.exports = Faq;
