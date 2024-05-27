import express from 'express';
export const groupsRouter = express.Router();
import { sql } from '../utils/db';
import Z from '../schema/plants';

// Get all groups
groupsRouter.get('/', async (req, res) => {
	const uid = Z.uid.parse(req.get('uid'));

	const plants = await sql`
    SELECT id, name, schedule
    FROM groups 
    WHERE uid = ${uid}
    `;
	return res.status(200).json(plants);
});

//Add one group
groupsRouter.post('/', async (req, res) => {
	const { name, schedule, plantsToAdd } = Z.addGroup.parse(req.body);
	const uid = Z.uid.parse(req.get('uid'));

	const groups = await sql`
    INSERT INTO groups (name, schedule, uid)
    VALUES (${name}, ${schedule}, ${uid})
    RETURNING groups.id
    `;

	const { id } = groups[0];
	const values = plantsToAdd.join(',');

	await sql`
    UPDATE plants 
    SET group_id = ${id}
    WHERE id IN (${values}) AND uid = ${uid}
    `;

	return res.status(200).send();
});

//Edit one group
groupsRouter.patch('/:id', async (req, res) => {
	const { name, schedule } = Z.editGroup.parse(req.body);
	const { id } = req.params;
	const uid = Z.uid.parse(req.get('uid'));

	const group = await sql`
    UPDATE groups
    SET name = ${name}, schedule = ${schedule}
    WHERE id = ${id} and uid = ${uid}
    RETURNING name, schedule
    `;
	return res.status(201).json(group);
});

//Delete one group
groupsRouter.delete('/:id', async (req, res) => {
	const { id } = req.params;
	const uid = Z.uid.parse(req.get('uid'));

	await sql`
    DELETE FROM groups
    WHERE id = ${id} and uid = ${uid}
    `;

	await sql`
    UPDATE plants
    SET group_id = null
    WHERE groupd_id  = ${id}
    `;
	return res.status(201).send();
});
