const { constants } = require("../constants");
const { VALIDATION_ERROR, NOTFOUND, UNAUTHORIZED, SERVERERROR, FORBIDDEN } =
  constants;
const errorHanlder = (error, req, res) => {
  const startusCode = res.statusCode || 500;
  console.log("errorHanldererrorHanlder");
  switch (startusCode) {
    case VALIDATION_ERROR:
      res.json({
        title: "Validation Error",
        massage: error.message,
        stackTrace: error.stack,
      });
      break;
    case NOTFOUND:
      res.json({
        title: "Not Found",
        massage: error.message,
        stackTrace: error.stack,
      });
    case UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        massage: error.message,
        stackTrace: error.stack,
      });
    case SERVERERROR:
      res.json({
        title: "Server Error",
        massage: error.message,
        stackTrace: error.stack,
      });
    case FORBIDDEN:
      res.json({
        title: "Not allowed Error",
        massage: error.message,
        stackTrace: error.stack,
      });
    default:
      console.log("no error found");
      break;
  }
};
module.exports = errorHanlder;
