import supertest from 'supertest';
import app from '../app';
import { it } from 'vitest';

const api = supertest(app);

it('returns purple sage', async () => {
	await api.get('/api/plants').expect(200);
});
