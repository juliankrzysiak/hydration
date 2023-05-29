import express from "express";
const app = express();
import cors from "cors";
import middleware from "./utils/middleware";

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

// route

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
