import { z } from 'zod';

const deletePlant = z.object({
	plant_id: z.number().int().positive(),
});
const newPlant = z.object({
	name: z.string().min(1),
	schedule: z.number().int().max(365),
});

const date = z.object({
	plant_id: z.number(),
	date: z.coerce.date(),
});
const uid = z.string().uuid();

export default { deletePlant, newPlant, date, uid };
