class CustomAPIError extends Error {
  constructor(message, statusCode, errorStatus) {
    super(message)
    this.statusCode = statusCode
    this.errorStatus = errorStatus
  }
}

function createCustomError(msg, statusCode, errorStatus) {
  return new CustomAPIError(msg, statusCode, errorStatus)
}

module.exports = { createCustomError, CustomAPIError }