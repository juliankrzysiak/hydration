import * as dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

export default { PORT, DB_USER, DB_PASSWORD};
