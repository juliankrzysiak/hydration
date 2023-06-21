import { z } from 'zod';

const deletePlant = z.object({
	plant_id: z.number().int().positive(),
});

export default { deletePlant };
