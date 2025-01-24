import ErrorHandler from "../utils/errorHandler.js";
export const errorMiddleware = async (err, req, res, next) => {
    try {
        err.statusCode = err.statusCode || 500;
        err.message = err.message || "Internal Server Error";

        res.status(statusCode).json({
            success:false,
            error:err
        })
    } catch (error) {
        console.error(error.message);
    }
}
// Separate function to handle spec
const handleSpecificErrors = (err) => {
  switch(err.name){
    case "CastError":
        handleCastError(err);
        break;
    
    case "ValidationError":
        handleValidatorError(err);
        break;
  }
}

// Handle invalid MongoDB ObjectID
const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}. Resource not found.`
  err.message = message;
  err.statusCode = 400;
}

// Handle Mongoose validation errors
const handleValidatorError = (err) => {
  const message = Object.values(err.errors).map((value) => {
    value.message
  }
  ).join(", ");
  err.message = message;
  err.statusCode = 400;
}

