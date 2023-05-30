import { sql } from './db';

const dropTables = async () => {
	await sql`
    DROP TABLE IF EXISTS water`;
	await sql`
    DROP TABLE IF EXISTS plants;
    `;
};

const createTables = async () => {
	await sql`
	CREATE TABLE plants (
		id SERIAL PRIMARY KEY,
		name text NOT NULL,
		schedule integer);
    `;

	await sql`
    CREATE TABLE water (
        id SERIAL PRIMARY KEY,
        date date,
        plant_id int NOT NULL,
			CONSTRAINT fk_id 
			FOREIGN KEY (plant_id)
        	REFERENCES plants(id))`;
};

const insertIntoTables = async () => {
	await sql`
    INSERT INTO plants (name, schedule)
    VALUES 
		('purple sage', 30),
        ('black sage', 7)
    `;

	await sql`
    INSERT INTO water (date, plant_id)
	VALUES 
		('2023-05-20', 1),
        ('2023-05-29', 2),
		('2023-05-20', 2)
		`;
};

export const plants = { dropTables, createTables, insertIntoTables };
