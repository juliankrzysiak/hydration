import supertest from 'supertest';
import app from '../app';
import { dbURI } from '../db';
import { plants } from '../utils/testHelper';
import { beforeAll, it, describe, afterAll, expect } from 'vitest';
import config from '../utils/config';

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
