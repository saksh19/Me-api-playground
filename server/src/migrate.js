import { pool } from './db/pool.js';

(async () => {
  try {
    console.log("Connecting with:", {
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  db: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
});

    // Ensure tables exist before inserting
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        education TEXT,
        work TEXT,
        github VARCHAR(255),
        linkedin VARCHAR(255),
        portfolio VARCHAR(255)
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS skills (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) UNIQUE
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        description TEXT,
        link VARCHAR(255)
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS project_skills (
        project_id INT,
        skill_id INT,
        PRIMARY KEY (project_id, skill_id),
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
        FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE,
        password VARCHAR(255)
      )
    `);

    // Seed users (ignore duplicate errors)
    await pool.execute(`
      INSERT IGNORE INTO users (name, email, education, work, github, linkedin, portfolio)
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
      INSERT IGNORE INTO skills (name) VALUES 
      ('JavaScript'), ('React'), ('Node.js'), ('MySQL'), ('Python')
    `);

    // Seed projects
    await pool.execute(`
      INSERT IGNORE INTO projects (title, description, link)
      VALUES (?, ?, ?)
    `, [
      'API Coverage Report',
      'A system to analyze and report API coverage for REST APIs.',
      'https://github.com/saksham/api-report'
    ]);

    // Link project with skills
    await pool.query(`
      INSERT IGNORE INTO project_skills (project_id, skill_id) VALUES (1, 2), (1, 3)
    `);

    // Seed admin (password already hashed with bcrypt)
    await pool.query(`
      INSERT IGNORE INTO admins (username, password)
      VALUES ('admin', '$2b$10$67n8FAXFnbf3YVkpaVWQx.p.uFi6maJ4RtJEBPo/qToslTj0lEEbi')
    `);

    console.log("✅ Seeding completed!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
})();
