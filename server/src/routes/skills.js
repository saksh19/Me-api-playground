import { Router } from 'express';
import { pool } from '../db/pool.js';

const router = Router();

router.get('/top', async (req, res, next) => {
  try {
    const data = await pool.query('SELECT id, name FROM skills');
    console.log("Fetched skills from DB:", data);
    res.json(data[0]);
  } catch (err) {
    console.error("Error in /skills/top:", err);
    next(err);
  }
});

export default router;
