import express from 'express';
export const plantsRouter = express.Router();
import { sql } from '../utils/db';

interface GetBody {
	uid: string;
}

plantsRouter.get('/', async (req, res) => {
	const { uid } = req.body as GetBody;
	const plants = await sql`
    SELECT plants.id, name, schedule, array_agg(water.date ORDER BY water.date ASC) as watered,
    MAX(water.date) + schedule as next_water
        FROM plants
        LEFT JOIN water
        ON plants.id = water.plant_id
        WHERE uid = ${uid}
        GROUP BY plants.id, name, schedule
    `;
	console.log(plants);
	return res.status(200).json(plants);
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
	return res.status(201).json(plants);
});

interface BodyWater {
	id: number;
	date: Date;
}

plantsRouter.post('/water', async (req, res) => {
	const { id, date } = req.body as BodyWater;
	const plant = await sql`
    INSERT INTO water
        (plant_id, date)
    VALUES 
        (${id}, ${date})
    RETURNING plant_id, date
    `;
	return res.status(201).json(plant);
});

plantsRouter.delete('/water', async (req, res) => {
	const { id, date } = req.body as BodyWater;
	const deletedPlant = await sql`
    DELETE FROM water 
    WHERE 
        plant_id = ${id}
    AND 
        date = ${date}
    RETURNING plant_id, date
    `;
	return res.status(200).json(deletedPlant);
});

plantsRouter.delete('/', async (req, res) => {
	const { id } = req.body as BodyWater;
	await sql`
    DELETE FROM water 
    WHERE 
        plant_id = ${id}
    RETURNING plant_id
    `;
	const deletedPlant = await sql`
    DELETE FROM plants
    WHERE 
        id = ${id}
    RETURNING id, name
    `;
	return res.status(200).json(deletedPlant);
});
