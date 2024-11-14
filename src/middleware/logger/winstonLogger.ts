import winston from "winston";
import WinstonCloudWatch from "winston-cloudwatch";
import config from "../../config";

const reqResLogFormat = winston.format.combine(
  winston.format.printf((info) => `${info.message}`)
);

export const reqResLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: reqResLogFormat,
    }),
  ],
});

const logFormat = winston.format.combine(
  winston.format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
  winston.format.json(),
  winston.format.prettyPrint()
);

export const devLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: logFormat,
    }),
  ],
});

export const cwLogger = winston.createLogger({
  level: "debug",
  format: logFormat,
  transports: [
    new WinstonCloudWatch({
      awsOptions: {
        credentials: {
          accessKeyId: config.awsCwAccessKey,
          secretAccessKey: config.awsCwSecretAccessKey,
        },
        region: config.awsCwRegion,
      },
      level: "error",
      logGroupName: config.awsCwLogGroup,
      logStreamName: config.awsCwLogStream,
      awsRegion: config.awsCwRegion,
    }),
  ],
});
