import express from "express";
import apiRoutes from "./api/apiRoutes";
import {config} from "../config";

export default function init(server) {
  server.use("/", (req, res, next) => {
    if (req.originalUrl === "/") {
      return res.status(200).json({
        message: `Terra API Version: ${config.apiVersion}`,
      });
    }
    return next();
  });

  server.use("/api", apiRoutes);
}
