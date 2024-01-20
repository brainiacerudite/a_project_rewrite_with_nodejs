const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    txnId: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Deposit = mongoose.model("Deposit", schema);
module.exports = Deposit;
