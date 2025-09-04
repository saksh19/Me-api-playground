import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../db/pool.js';
import { comparePassword } from '../utils/password.js';


const router = Router();


router.post('/login', async (req, res, next) => {
try {
const { username, password } = req.body;
console.log('Login attempt:', { username, password });
if (!username || !password) return res.status(400).json({ error: 'username and password required' });


const [rows] = await pool.query('SELECT * FROM admins WHERE username = ?', [username]);
const admin = rows[0];
if (!admin) return res.status(401).json({ error: 'Invalid credentials' });


const ok = await comparePassword(password, admin.password);
if (!ok) return res.status(401).json({ error: 'Invalid credentials' });



const token = jwt.sign({ sub: admin.id, role: 'admin', username }, process.env.JWT_SECRET, { expiresIn: '12h' });
return res.json({ token });
} catch (err) {
next(err);
}
});



export default router;