-- D1 schema for reader answers.
-- Run once:  npx wrangler d1 execute atlas-answers --remote --file=schema.sql
CREATE TABLE IF NOT EXISTS answers (
  id         TEXT PRIMARY KEY,
  text       TEXT NOT NULL,
  source     TEXT,
  country    TEXT,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_answers_source  ON answers(source);
CREATE INDEX IF NOT EXISTS idx_answers_created ON answers(created_at);
