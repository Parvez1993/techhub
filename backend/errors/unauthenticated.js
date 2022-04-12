import { StatusCodes } from "http-status-codes";
import UnAuthenticatedError from "./custom-api.js";

class UnAuthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnAuthenticatedError;
