import supertest from 'supertest';
import app from '../app';
import sql, { dbURI } from '../db';
import { beforeAll, it, describe, afterAll, expect } from 'vitest';
import config from '../utils/config';

const api = supertest(app);

beforeAll(async () => {
	// Just in case, don't wanna delete prod DB
	if (dbURI !== config.TEST_DB_URI) return;

	await sql`
    DROP TABLE IF EXISTS water`;
	await sql`
    DROP TABLE IF EXISTS plants;
    `;

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
});

afterAll(async () => {
	await sql`
    DROP TABLE IF EXISTS water`;
	await sql`
        DROP TABLE IF EXISTS plants;
    `;
});

describe('get all route', () => {
	it('returns successfuly', async () => {
		await api.get('/api/plants').expect(200);
	});
	it('returns second plant info', async () => {
		const secondPlant = {
			id: 2,
			name: 'black sage',
			watered: ['2023-05-20T00:00:00.000Z', '2023-05-29T00:00:00.000Z'],
			schedule: 7,
			next_water: '2023-06-05T00:00:00.000Z',
		};

		const res = await api.get('/api/plants');
		expect(res.body).toHaveLength(2);
		expect(res.body[1]).toEqual(secondPlant);
	});
});

// describe('get water_schedule route', () => {
// 	it('returns successfuly', async () => {
// 		await api.get('/api/plants/water').expect(200);
// 	});

// 	it('returns correct calculation', async () => {
// 		const res = await api.get('/api/plants/water');
// 		expect(res.body[0].water_date).toBe('2023-06-28T00:00:00.000Z');
// 		expect(res.body[1].water_date).toBe('2023-06-28T00:00:00.000Z');
// 	});
// });
