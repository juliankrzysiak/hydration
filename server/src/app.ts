import express from 'express';
require('express-async-errors');
const app = express();
import cors from 'cors';
import middleware from './utils/middleware';
import plantsRouter from './controllers/plants';

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

// route
app.use('/api/plants', plantsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
