CREATE TABLE IF NOT EXISTS site_content (
  key VARCHAR(50) PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Optional: Initial seed (will be handled by the app if empty, but good to have)
-- INSERT INTO site_content (key, data) VALUES ('hero', '{...}') ON CONFLICT DO NOTHING;
