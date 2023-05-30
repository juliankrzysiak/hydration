import express from 'express';
const plantsRouter = express.Router();
import sql from '../db';

plantsRouter.get('/', async (_req, res) => {
	const plants = await sql`
    select *
    from plants
    `;
	res.status(200).json(plants);
});

export default plantsRouter;
