import logger from "./logger";

const requestLogger = (req, res, next) => {
  logger.info(`Method: ${res.methof}`);
  logger.info(`PATH: ${res.path}`);
  logger.info(`Body: ${res.body}`);
  logger.info("---");
  next();
};

const unknownEndpoint = (res, res) => {
  res.status(400).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

export default { requestLogger, unknownEndpoint, errorHandler };
