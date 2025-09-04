import { Router } from "express";
import { pool } from "../db/pool.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: "q query param required" });
    }

    const like = `%${q}%`;
    const [profiles] = await pool.query(
      "SELECT * FROM profiles WHERE name LIKE ? OR email LIKE ?",
      [like, like]
    );

    res.json({ profiles });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;   
