const Joi = require("joi");
const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ValidationError = require("../utils/ValidationError");

const createErrorDetails = (details, errorDetails) => {
  const field = details.context.key;
  if (!errorDetails[field]) {
    // Remove quotes around the error message
    let message = details.message.replace(/^"|"$/g, "").replace(/"/g, "");
    errorDetails[field] = message;
  }
};

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ["params", "query", "body"]);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorDetails = {};
    error.details.forEach((details) =>
      createErrorDetails(details, errorDetails)
    );

    // Customize the error message
    let firstErrorMessage = errorDetails[Object.keys(errorDetails)[0]];
    let totalErrorsCount = Object.keys(errorDetails).length;

    // Check if there are more than one errors
    let checkErrorPlural = totalErrorsCount - 1 > 1 ? "errors" : "error";
    let moreErrorsMessage =
      totalErrorsCount > 1
        ? ` (and ${totalErrorsCount - 1} more ${checkErrorPlural})`
        : "";

    return next(
      new ValidationError(
        httpStatus.UNPROCESSABLE_ENTITY,
        `The ${firstErrorMessage}${moreErrorsMessage}`,
        true,
        "",
        errorDetails
      )
    );
  }

  Object.assign(req, value);
  return next();
};

module.exports = validate;
