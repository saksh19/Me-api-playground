import 'dotenv/config';
import app from './app.js';

const PORT = process.env.PORT || 8080;

try {
  app.listen(PORT, () => {
    console.log(`✅ Server listening on port ${PORT}`);
  });
} catch (err) {
  console.error("❌ Failed to start server:", err);
}
