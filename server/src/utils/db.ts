import { config } from './config.js';
import postgres from 'postgres';

export const dbURI =
	process.env.NODE_ENV === 'test'
		? (config.TEST_DB_URI as string)
		: (config.DB_URI as string);

export const sql = postgres(dbURI);
