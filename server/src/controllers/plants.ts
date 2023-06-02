import express from 'express';
export const plantsRouter = express.Router();
import { sql } from '../utils/db';

plantsRouter.get('/', async (_req, res) => {
	const plants = await sql`
    SELECT plants.id, name, schedule, array_agg(water.date ORDER BY water.date ASC) as watered,
    MAX(water.date) + schedule as next_water
        FROM plants
        LEFT JOIN water
        ON plants.id = water.plant_id
        GROUP BY plants.id, name, schedule
    `;
	res.status(200).json(plants);
});

interface PostBody {
	name: string;
	schedule: number;
}

plantsRouter.post('/', async (req, res) => {
	const { name, schedule } = req.body as PostBody;
	const plants = await sql`
    INSERT INTO plants 
        (name, schedule) 
    VALUES 
        (${name}, ${schedule})
    RETURNING name, schedule
    `;
	res.status(201).json(plants);
});
