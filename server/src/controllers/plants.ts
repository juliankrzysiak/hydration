import express from 'express';
const plantsRouter = express.Router();
import sql from '../db';

plantsRouter.get('/', async (_req, res) => {
	const plants = await sql`
    SELECT plants.id, name, schedule, array_agg(water.date ORDER BY water.date ASC) as watered,
    MAX(water.date) + schedule as next_water
        FROM plants
        LEFT JOIN water
        ON plants.id = water.plant_id
        GROUP BY plants.id, name, schedule
    `;
	res.status(200).send(plants);
});

plantsRouter.get('/water', async (_req, res) => {
	const plants = await sql`
    
    `;

	res.status(200).json(plants);
});

export default plantsRouter;

// INSERT INTO water (date, plant_id) VALUES
// ('2023-04-13', (SELECT id FROM plants WHERE id = 2))
