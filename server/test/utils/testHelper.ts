import { sql } from '../../src/utils/db';

const uid = '196e5ea6-bae9-417e-b0c2-66c1c5adab4a';
const uidB = '196e5ea6-bae9-417e-b0c2-66c1c5adab4b';

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
		schedule integer,
		uid uuid NOT NULL,
		group_id integer DEFAULT NULL
		);
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
    INSERT INTO plants (name, schedule, uid)
    VALUES 
		('purple sage', 7, ${uid}),
        ('black sage', 30, ${uidB})
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
