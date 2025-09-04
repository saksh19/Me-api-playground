import { Router } from 'express';
import { pool } from '../db/pool.js';
import { authenticate } from '../middleware/auth.js';


const router = Router();



router.get('/', async (req, res, next) => {
try {
const [rows] = await pool.query('SELECT * FROM users ORDER BY id ASC LIMIT 1');
if (!rows.length) return res.status(404).json({ error: 'Profile not found' });
res.json(rows[0]);
} catch (err) {
next(err);
}
});


// POST profile (create) - protected
router.post('/', authenticate, async (req, res, next) => {
try {
const { name, email, education, work, github, linkedin, portfolio } = req.body;
const [result] = await pool.query(
`INSERT INTO users (name, email, education, work, github, linkedin, portfolio)
VALUES (?, ?, ?, ?, ?, ?, ?)`,
[name, email, education, work, github, linkedin, portfolio]
);
const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [result.insertId]);
res.status(201).json(rows[0]);
} catch (err) {
next(err);
}
});


// PUT profile (update) - protected
router.put('/', authenticate, async (req, res, next) => {
try {
const fields = ['name','email','education','work','github','linkedin','portfolio'];
const updates = [];
const values = [];


for (const f of fields) {
if (req.body[f] !== undefined) {
updates.push(`${f} = ?`);
values.push(req.body[f]);
}
}


if (!updates.length) return res.status(400).json({ error: 'No fields to update' });


// Update the first (or only) profile row
const [existing] = await pool.query('SELECT id FROM users ORDER BY id ASC LIMIT 1');
if (!existing.length) return res.status(404).json({ error: 'Profile not found' });


values.push(existing[0].id);
await pool.query(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`, values);


const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [existing[0].id]);
res.json(rows[0]);
} catch (err) {
next(err);
}
});

export default router;