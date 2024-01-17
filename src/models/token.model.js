const mongoose = require("mongoose");
const { Schema } = mongoose;
const { tokenTypes } = require("../config/tokens");
const { toJSON } = require("./plugins");

const tokenSchema = Schema(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: "String",
      enum: [
        tokenTypes.REFRESH,
        tokenTypes.RESET_PASSWORD,
        tokenTypes.VERIFY_EMAIL,
      ],
      required,
    },
    expires: {
      type: Date,
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// add plugin
tokenSchema.plugins(toJSON);

/**
 * @typedef Token
 */
const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
