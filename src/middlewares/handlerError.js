// Custom error handling middleware
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode ?? 500

  return res.status(statusCode).json({
    error: statusCode,
    message: err.message
  })
}

export default errorHandler
