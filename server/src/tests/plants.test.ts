import supertest from 'supertest';
import { beforeAll, it, describe, afterAll, expect } from 'vitest';
import { dbURI } from '../utils/db';
import { app } from '../app';
import { plants } from '../utils/testHelper';
import { config } from '../utils/config';
import { sql } from '../utils/db';

const api = supertest(app);
const uid = '196e5ea6-bae9-417e-b0c2-66c1c5adab4a';
const uidB = '196e5ea6-bae9-417e-b0c2-66c1c5adab4b';

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
		await api.get('/api/plants').set('uid', `${uid}`).expect(200);
	});
	it('returns correct user plant ', async () => {
		const plant = {
			id: 1,
			name: 'purple sage',
			watered: ['2023-05-20'],
			schedule: 7,
			next_water: '2023-05-27',
		};

		const res = await api.get('/api/plants').set('uid', `${uid}`);
		expect(res.body).toHaveLength(1);
		expect(res.body[0]).toEqual(plant);
	});
});

describe('POST plant route', () => {
	it('returns posted plant', async () => {
		const req = {
			name: 'white sage',
			schedule: 3,
		};

		const res = await api
			.post('/api/plants')
			.send(req)
			.set('uid', `${uid}`)
			.expect(201);
		expect(res.body).toContainEqual(req);
	});
	it('shows posted plant with GET', async () => {
		const res = await api.get('/api/plants').set('uid', `${uid}`).expect(200);

		expect(res.body).toHaveLength(2);
		expect(res.body).toContainEqual({
			id: 3,
			name: 'white sage',
			schedule: 3,
			watered: [null],
			next_water: null,
		});
	});
});

describe('PATCH single plant', () => {
	afterAll(async () => {
		await api
			.patch('/api/plants/3')
			.set('uid', `${uid}`)
			.send({ name: 'white sage', schedule: 3 });
	});
	it('returns plant', async () => {
		const req = {
			name: 'not white sage',
			schedule: 7,
		};
		const res = await api
			.patch('/api/plants/3')
			.set('uid', `${uid}`)
			.send(req)
			.expect(201);

		expect(res.body).toContainEqual(req);
	});

	it('shows up correctly with GET', async () => {
		const res = await api.get('/api/plants').set('uid', `${uid}`).expect(200);
		expect(res.body).toContainEqual({
			id: 3,
			name: 'not white sage',
			schedule: 7,
			watered: [null],
			next_water: null,
		});
	});
});

describe('POST single date route', () => {
	it('returns posted date', async () => {
		const req = {
			plant_id: 1,
			date: '2023-05-22',
		};
		const res = await api.post('/api/plants/water').send(req).expect(201);
		expect(res.body).toContainEqual(req);
	});

	it('shows correct date', async () => {
		const res = await api.get('/api/plants').set('uid', `${uid}`).expect(200);

		expect(res.body[0].watered).toEqual(['2023-05-20', '2023-05-22']);
	});
	it('shows correct calculated date', async () => {
		const res = await api.get('/api/plants').set('uid', `${uid}`).expect(200);

		expect(res.body[0].next_water).toEqual('2023-05-29');
	});
});

describe('DELETE single date route', () => {
	it('returns deleted date', async () => {
		const req = {
			plant_id: 1,
			date: '2023-05-22',
		};
		const res = await api.delete('/api/plants/water').send(req).expect(200);
		expect(res.body).toContainEqual(req);
	});
	it('should be deleted with GET', async () => {
		const res = await api.get('/api/plants').set('uid', `${uid}`).expect(200);

		expect(res.body[0].watered).toContain('2023-05-20');
		expect(res.body[0].watered).not.toContain('2023-05-22');
	});
	it('should have next_water recalculated', async () => {
		const res = await api.get('/api/plants').set('uid', `${uid}`).expect(200);

		expect(res.body[0].next_water).toEqual('2023-05-27');
	});
});

describe('DELETE entire plant and data route', () => {
	it('returns deleted plant', async () => {
		const req = {
			plant_id: 1,
		};
		const res = await api
			.delete('/api/plants')
			.set('uid', `${uid}`)
			.send(req)
			.expect(200);
		expect(res.body).toContainEqual({ id: 1, name: 'purple sage' });
	});

	it('should not delete other plant', async () => {
		const res = await api.get('/api/plants').set('uid', `${uid}`).expect(200);
		expect(res.body).toContainEqual({
			id: 3,
			name: 'white sage',
			schedule: 3,
			watered: [null],
			next_water: null,
		});
	});
	it('should not have anything left in water table', async () => {
		const dates = await sql`
		SELECT * FROM water
		WHERE plant_id = 1
		`;
		expect(dates).toEqual([]);
	});
	it('should not delete anything else', async () => {
		const res = await api.get('/api/plants').set('uid', `${uidB}`).expect(200);
		expect(res.body[0]).toBeDefined();
		expect(res.body[0].watered).toHaveLength(2);
	});
});

describe('DELETE all plants from one user', () => {
	it('should return deleted plants', async () => {
		const res = await api
			.delete('/api/plants/delete')
			.set('uid', `${uid}`)
			.expect(200);
		expect(res.body).toContainEqual({ id: 3, name: 'white sage' });
	});
	it('should not have anything left in water table', async () => {
		const dates = await sql`
		SELECT * FROM water
		WHERE plant_id = 3
		`;
		expect(dates).toEqual([]);
	});
	it('should not delete from other user', async () => {
		const res = await api.get('/api/plants').set('uid', `${uidB}`).expect(200);
		expect(res.body[0]).toBeDefined();
		expect(res.body[0].watered).toHaveLength(2);
	});
});
