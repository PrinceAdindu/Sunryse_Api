import {includes} from "../cors/allowedOrigins";

export default function checkCredentials(req, res, next) {
  const origin = req.headers.origin;
  if (includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
}
