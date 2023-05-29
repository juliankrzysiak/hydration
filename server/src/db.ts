import config from './utils/config.js';
import postgres from 'postgres';

const sql = postgres(
	`postgres://${config.DB_USER}:${config.DB_PASSWORD}@mahmud.db.elephantsql.com/${config.DB_USER}`
);

export default sql;
