import supertest from 'supertest';
import { beforeAll, it, describe, afterAll, expect } from 'vitest';
import { dbURI } from '../utils/db';
import { app } from '../app';
import { plants } from '../utils/testHelper';
import { config } from '../utils/config';

const api = supertest(app);

beforeAll(async () => {
	// Just in case, don't wanna delete prod DB
	if (dbURI !== config.TEST_DB_URI) return;
	await plants.dropTables();
	await plants.createTables();
	await plants.insertIntoTables();
});

afterAll(async () => {
	await plants.dropTables();
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
