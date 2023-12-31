class CustomError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
  }
}

const createCE = (msg, statusCode) => {
  return new CustomError(msg, statusCode)
}

module.exports = { createCE, CustomError }
