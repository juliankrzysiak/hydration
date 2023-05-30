import * as dotenv from 'dotenv';
dotenv.config();

const { PORT, DB_URI, TEST_DB_URI } = process.env;

export default { PORT, DB_URI, TEST_DB_URI };
