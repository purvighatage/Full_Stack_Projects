module.exports = (err, req, res, next) => {
  console.error(err);

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: 'Invalid JSON payload',
      errors: []
    });
  }

  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error',
    errors: err.errors || []
  });
};
