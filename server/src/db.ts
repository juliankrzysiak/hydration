import config from './utils/config.js';
import postgres from 'postgres';

export const dbURI =
	process.env.NODE_ENV === 'test'
		? (config.TEST_DB_URI as string)
		: (config.DB_URI as string);

const sql = postgres(dbURI);

export default sql;
