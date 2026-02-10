import express from 'express';
import cors from 'cors';
import { query } from './db.js'; // Adicionado .js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Initialize DB
const initDb = async () => {
  try {
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    await query(schemaSql);
    console.log('Database initialized successfully');
  } catch (err) {
    console.error('Error initializing database:', err);
  }
};

initDb();

// Get all content
app.get('/api/content', async (req, res) => {
  try {
    const result = await query('SELECT key, data FROM site_content');
    const content: Record<string, any> = {};
    result.rows.forEach(row => {
      content[row.key] = row.data;
    });
    res.json(content);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update specific section
app.post('/api/content/:section', async (req, res) => {
  const { section } = req.params;
  const data = req.body;

  try {
    // Upsert (Insert or Update)
    await query(
      `INSERT INTO site_content (key, data, updated_at) 
       VALUES ($1, $2, NOW()) 
       ON CONFLICT (key) 
       DO UPDATE SET data = $2, updated_at = NOW()`,
      [section, data]
    );
    res.json({ success: true, section });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});