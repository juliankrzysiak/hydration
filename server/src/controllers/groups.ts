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
