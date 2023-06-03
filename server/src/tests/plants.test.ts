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

describe('GET all route', () => {
	it('returns successfuly', async () => {
		await api.get('/api/plants').expect(200);
	});
	it('returns second plant info', async () => {
		const secondPlant = {
			id: 2,
			name: 'black sage',
			watered: ['2023-05-20', '2023-05-29'],
			schedule: 7,
			next_water: '2023-06-05',
		};

		const res = await api.get('/api/plants');
		expect(res.body).toHaveLength(2);
		expect(res.body[1]).toEqual(secondPlant);
	});
});

describe('POST plant route', () => {
	it('returns posted plant', async () => {
		const req = {
			name: 'white sage',
			schedule: 3,
		};

		const res = await api.post('/api/plants').send(req).expect(201);
		expect(res.body).toEqual([req]);
	});
	it('shows posted plant with GET', async () => {
		const res = await api.get('/api/plants').expect(200);

		expect(res.body).toHaveLength(3);
		expect(res.body).toContainEqual({
			id: 3,
			name: 'white sage',
			schedule: 3,
			watered: [null],
			next_water: null,
		});
	});
});

describe('POST water history route', () => {
	it('returns posted date', async () => {
		const req = {
			id: 3,
			date: '2023-04-20',
		};
		const res = await api.post('/api/plants/water').send(req).expect(201);
		expect(res.body).toEqual([{ plant_id: 3, date: '2023-04-20' }]);
	});

	it('shows correct date', async () => {
		const res = await api.get('/api/plants').expect(200);

		expect(res.body).toHaveLength(3);
		expect(res.body[2].watered).toEqual(['2023-04-20']);
	});
	it('shows correct calculated date', async () => {
		const res = await api.get('/api/plants').expect(200);

		expect(res.body[2].next_water).toEqual('2023-04-23');
	});
});
