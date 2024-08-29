import {verify} from "jsonwebtoken";
import config from "../config";

export default function verifyAccessToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).json({message: "Authorization not provided"}); // Unauthorizes
  const token = authHeader.split(" ")[1];
  verify(token, config.accessTokenSecret, (error, decoded) => {
    if (error) return res.status(403).json({message: "Inavlaid access token"}); // Invalid token forbidden
    req.id = decoded.id;
    next();
  });
}
