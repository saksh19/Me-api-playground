import { Router } from 'express';
import { pool } from '../db/pool.js';


const router = Router();


// Helper to attach skills per project id
async function attachSkills(projects) {
if (!projects.length) return projects;
const ids = projects.map(p => p.id);
const [rows] = await pool.query(
`SELECT ps.project_id, s.name AS skill
FROM project_skills ps
JOIN skills s ON s.id = ps.skill_id
WHERE ps.project_id IN (${ids.map(() => '?').join(',')})`, ids
);
const map = new Map();
for (const p of projects) map.set(p.id, []);
for (const r of rows) map.get(r.project_id).push(r.skill);
return projects.map(p => ({ ...p, skills: map.get(p.id) || [] }));
}


router.get('/', async (req, res, next) => {
try {
const { skill, page = 1, limit = 10 } = req.query;
const pageNum = Math.max(1, parseInt(page, 10));
const lim = Math.max(1, Math.min(100, parseInt(limit, 10)));
const offset = (pageNum - 1) * lim;


if (skill) {
const [rows] = await pool.query(
`SELECT p.* FROM projects p
JOIN project_skills ps ON ps.project_id = p.id
JOIN skills s ON s.id = ps.skill_id
WHERE s.name = ?
GROUP BY p.id
ORDER BY p.id ASC
LIMIT ? OFFSET ?`,
[skill, lim, offset]
);
const withSkills = await attachSkills(rows);
return res.json({ page: pageNum, limit: lim, items: withSkills });
} else {
const [rows] = await pool.query(
`SELECT * FROM projects ORDER BY id ASC LIMIT ? OFFSET ?`,
[lim, offset]
);
const withSkills = await attachSkills(rows);
return res.json({ page: pageNum, limit: lim, items: withSkills });
}
} catch (err) {
next(err);
}
});


export default router;