const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = Schema({});

const Page = mongoose.model("Page", schema);
module.exports = Page;
