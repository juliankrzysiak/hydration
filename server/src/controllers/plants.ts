import express from 'express';
export const plantsRouter = express.Router();
import { sql } from '../utils/db';

plantsRouter.get('/', async (req, res) => {
	const uid = req.get('uid');
	if (typeof uid !== 'string') throw new Error('Uid is not a string!');

	const plants = await sql`
    SELECT plants.id, name, schedule, array_agg(water.date ORDER BY water.date ASC) as watered,
    MAX(water.date) + schedule as next_water
        FROM plants
        LEFT JOIN water
        ON plants.id = water.plant_id
        WHERE uid = ${uid}
        GROUP BY plants.id, name, schedule
    `;
	return res.status(200).json(plants);
});

interface PostBody {
	name: string;
	schedule: number;
}

// Create new plant
plantsRouter.post('/', async (req, res) => {
	const { name, schedule } = req.body as PostBody;
	const uid = req.get('uid');
	if (typeof uid !== 'string') throw new Error('Uid is not a string!');

	const plants = await sql`
    INSERT INTO plants 
        (name, schedule, uid) 
    VALUES 
        (${name}, ${schedule}, ${uid})
    RETURNING name, schedule
    `;
	return res.status(201).json(plants);
});

interface BodyWater {
	plant_id: number;
	date: Date;
}
// Post single date
plantsRouter.post('/water', async (req, res) => {
	const { plant_id, date } = req.body as BodyWater;
	const plant = await sql`
    INSERT INTO water
        (plant_id, date)
    VALUES 
        (${plant_id}, ${date})
    RETURNING plant_id, date
    `;
	return res.status(201).json(plant);
});

// Delete one date
plantsRouter.delete('/water', async (req, res) => {
	const { plant_id, date } = req.body as BodyWater;
	const deletedPlant = await sql`
    DELETE FROM water 
    WHERE 
        plant_id = ${plant_id}
    AND 
        date = ${date}
    RETURNING plant_id, date

    `;
	return res.status(200).json(deletedPlant);
});

// Delete one plant and associated dates
plantsRouter.delete('/', async (req, res) => {
	const { plant_id } = req.body as BodyWater;
	const uid = req.get('uid');
	if (typeof uid !== 'string') throw new Error('Uid is not a string!');

	await sql`
    DELETE FROM water 
    WHERE 
        plant_id = ${plant_id}
    `;
	const deletedPlant = await sql`
    DELETE FROM plants
    WHERE 
        id = ${plant_id}
    AND 
        uid = ${uid}
    RETURNING id, name
    `;
	return res.status(200).json(deletedPlant);
});
