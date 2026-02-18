const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.orginalUrl}`);
  res.status(404); // ie not found
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === "Cast Error" && err.kind === "Object Id") {
    statusCode = 404;
    message = "Resource not found";
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { errorHandler, notFound };
