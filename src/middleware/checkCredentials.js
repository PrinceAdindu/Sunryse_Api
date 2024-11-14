import {allowedOrigins} from "../cors/allowedOrigins";

export default function checkCredentials(req, res, next) {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
}
