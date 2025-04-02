import { z } from 'zod';
//TODO: Split into separate schemas

const deletePlant = z.object({
	plant_id: z.number().int().positive(),
});

const newPlant = z.object({
	name: z.string().min(1),
	schedule: z.number().int().max(365),
	group_id: z.number().int().optional(),
});

const addGroup = z.object({
	name: z.string().min(1),
	schedule: z.number().int().max(365),
	plantsToAdd: z.number().array(),
});

const editGroup = z.object({
	name: z.string().min(1),
	schedule: z.number().int().max(365),
});

const arrDifferences = z.object({
	add: z.number().array(),
	remove: z.number().array(),
});

const date = z.object({
	plant_id: z.number().array(),
	date: z.coerce.date(),
});
const uid = z.string().uuid();

export default {
	deletePlant,
	newPlant,
	arrDifferences,
	editGroup,
	addGroup,
	date,
	uid,
};
