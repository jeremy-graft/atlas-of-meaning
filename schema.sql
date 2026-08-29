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

-- Anonymous funnel events. No identifier of any kind is stored.
CREATE TABLE IF NOT EXISTS events (
  id         TEXT PRIMARY KEY,
  name       TEXT NOT NULL,
  country    TEXT,
  referrer   TEXT,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_events_name    ON events(name);
CREATE INDEX IF NOT EXISTS idx_events_created ON events(created_at);
