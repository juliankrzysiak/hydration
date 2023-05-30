import supertest from 'supertest';
import app from '../app';
import sql, { dbURI } from '../db';
import { beforeAll, it, describe, afterAll, expect } from 'vitest';
import config from '../utils/config';

const api = supertest(app);

beforeAll(async () => {
	if (dbURI !== config.TEST_DB_URI) return;
	await sql`
    DROP TABLE IF EXISTS plants
    `;
	await sql`
        CREATE TABLE plants (
            id SERIAL PRIMARY KEY,
            name text,
            watered date[],
            schedule text);
    `;
	await sql`
    INSERT INTO plants (name, watered, schedule)
    VALUES 
    ('purple sage', '{"2023-05-29"}', '1w'),
    ('black sage','{"2023-05-29"}', '1m'),
    ('white sage','{"2023-05-29"}', '1w');
    `;
});

afterAll(async () => {
	await sql`
        DROP TABLE IF EXISTS plants;
    `;
});

describe('get route', () => {
	it('returns successfuly', async () => {
		await api.get('/api/plants').expect(200);
	});
	it('returns second plant info', async () => {
		const secondPlant = {
			id: 2,
			name: 'black sage',
			watered: ['2023-05-29T00:00:00.000Z'],
			schedule: '1m',
		};

		const res = await api.get('/api/plants');
		expect(res.body).toHaveLength(3);
		expect(res.body[1]).toEqual(secondPlant);
	});
});
