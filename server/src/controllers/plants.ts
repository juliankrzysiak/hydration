import express from 'express';
export const plantsRouter = express.Router();
import { sql } from '../utils/db';
import Z from '../schema/plants';

plantsRouter.get('/', async (req, res) => {
	const uid = Z.uid.parse(req.get('uid'));
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

// Create new plant
plantsRouter.post('/', async (req, res) => {
	const { name, schedule } = Z.newPlant.parse(req.body);
	const uid = Z.uid.parse(req.get('uid'));

	const plants = await sql`
    INSERT INTO plants 
        (name, schedule, uid) 
    VALUES 
        (${name}, ${schedule}, ${uid})
    RETURNING name, schedule
    `;
	return res.status(201).json(plants);
});

//Edit one plant
plantsRouter.patch('/:id', async (req, res) => {
	const { name, schedule } = Z.newPlant.parse(req.body);
	const { id } = req.params;
	const uid = Z.uid.parse(req.get('uid'));

	const plant = await sql`
    UPDATE plants 
    SET name = ${name}, schedule = ${schedule}
    WHERE uid = ${uid} AND id = ${id}
    RETURNING name, schedule
    `;
	return res.status(201).json(plant);
});

// Post single date
plantsRouter.post('/water', async (req, res) => {
	const { plant_id, date } = Z.date.parse(req.body);
	await Promise.all(
		plant_id.map(
			async (id) =>
				await sql`
    INSERT INTO water
        (plant_id, date)
    VALUES 
        (${id}, ${date})
    RETURNING plant_id, date
    `
		)
	);

	return res.status(201).send();
});

// Delete one date
plantsRouter.delete('/water', async (req, res) => {
	const { plant_id, date } = Z.date.parse(req.body);
	await Promise.all(
		plant_id.map(
			async (id) =>
				await sql`
    DELETE FROM water 
    WHERE 
        plant_id = ${id}
    AND 
        date = ${date}
    RETURNING plant_id, date

    `
		)
	);
	return res.status(200).send();
});

// Delete one plant and associated dates
plantsRouter.delete('/', async (req, res) => {
	const { plant_id } = Z.deletePlant.parse(req.body);
	const uid = Z.uid.parse(req.get('uid'));

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

// Delete all plants
plantsRouter.delete('/delete', async (req, res) => {
	const uid = Z.uid.parse(req.get('uid'));

	await sql`
    DELETE FROM water
    WHERE 
        plant_id IN (
    SELECT 
        id from plants
    WHERE 
        uid = ${uid}
)
    `;
	const deletedPlants = await sql`
    DELETE FROM plants
    WHERE uid = ${uid}
    RETURNING id, name
    `;
	return res.status(200).json(deletedPlants);
});
