import { z } from 'zod';

const deletePlant = z.object({
	plant_id: z.number().int().positive(),
});
const uid = z.string().uuid();

export default { deletePlant, uid};
