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

router.put('/update',authenticate, async (req, res, next) => {
  try {
    const { skills } = req.body;
    if (!Array.isArray(skills)) {
      return res.status(400).json({ error: 'Invalid skills format' });
    }

    // 1️⃣ Fetch current skills from DB
    const { rows: existingSkills } = await pool.query('SELECT id, name FROM skills');

    const existingNames = existingSkills.map(s => s.name);
    const newNames = skills.map(s => s.name);

    // 2️⃣ Delete skills that are not in new array
    const namesToDelete = existingNames.filter(name => !newNames.includes(name));
    if (namesToDelete.length) {
      await pool.query(
        `DELETE FROM skills WHERE name = ANY($1::text[])`,
        [namesToDelete]
      );
    }

    // 3️⃣ Insert new skills that don’t exist yet
    const namesToInsert = newNames.filter(name => !existingNames.includes(name));
    const insertPromises = namesToInsert.map(name => 
      pool.query('INSERT INTO skills (name) VALUES ($1)', [name])
    );
    await Promise.all(insertPromises);

    res.json({ message: 'Skills updated successfully' });
  } catch (err) {
    console.error("Error in /skills/top:", err);
    next(err);
  }
});

export default router;
