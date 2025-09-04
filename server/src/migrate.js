import { pool } from './db/pool.js';

(async () => {
  try {
    // Seed users
    await pool.query(`
      INSERT INTO users (name, email, education, work, github, linkedin, portfolio)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
      'Saksham Khandelwal',
      'saksham@example.com',
      'B.Tech in Computer Science',
      'Intern at Akeo',
      'https://github.com/saksham',
      'https://linkedin.com/in/saksham',
      'https://saksham.dev'
    ]);

    // Seed skills
    await pool.query(`
      INSERT INTO skills (name) VALUES 
      ('JavaScript'), ('React'), ('Node.js'), ('MySQL'), ('Python')
    `);

    // Seed projects
    await pool.query(`
      INSERT INTO projects (title, description, link)
      VALUES (?, ?, ?)
    `, [
      'API Coverage Report',
      'A system to analyze and report API coverage for REST APIs.',
      'https://github.com/saksham/api-report'
    ]);

    // Seed project_skills
    await pool.query(`
      INSERT INTO project_skills (project_id, skill_id) VALUES (1, 2), (1, 3)
    `);

    // Seed admin (password already hashed using bcrypt)
    await pool.query(`
      INSERT INTO admins (username, password)
      VALUES ('admin', '$2b$10$67n8FAXFnbf3YVkpaVWQx.p.uFi6maJ4RtJEBPo/qToslTj0lEEbi')
    `);

    console.log("✅ Seeding completed!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding data:", err.message);
    process.exit(1);
  }
})();
