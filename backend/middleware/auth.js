const { UnAuthenticatedError } = require("../errors/index.js");
const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  // const headers = req.headers;
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);
    // attach the user request object
    // req.user = payload
    req.user = { userId: payload.id };
    console.log(req.user);
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Authentication invalid");
  }
};

export default auth;
