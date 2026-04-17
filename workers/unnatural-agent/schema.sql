-- =============================================================================
-- Better Auth tables (email magic link, D1 adapter)
-- =============================================================================

CREATE TABLE IF NOT EXISTS "user" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "emailVerified" INTEGER NOT NULL DEFAULT 0,
  "image" TEXT,
  "createdAt" INTEGER NOT NULL,
  "updatedAt" INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS "session" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "expiresAt" INTEGER NOT NULL,
  "token" TEXT NOT NULL UNIQUE,
  "createdAt" INTEGER NOT NULL,
  "updatedAt" INTEGER NOT NULL,
  "ipAddress" TEXT,
  "userAgent" TEXT,
  "userId" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "account" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "accountId" TEXT NOT NULL,
  "providerId" TEXT NOT NULL,
  "userId" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "accessToken" TEXT,
  "refreshToken" TEXT,
  "idToken" TEXT,
  "accessTokenExpiresAt" INTEGER,
  "refreshTokenExpiresAt" INTEGER,
  "scope" TEXT,
  "password" TEXT,
  "createdAt" INTEGER NOT NULL,
  "updatedAt" INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS "verification" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "identifier" TEXT NOT NULL,
  "value" TEXT NOT NULL,
  "expiresAt" INTEGER NOT NULL,
  "createdAt" INTEGER,
  "updatedAt" INTEGER
);

-- =============================================================================
-- Analysis repository
-- =============================================================================

CREATE TABLE IF NOT EXISTS analyses (
  id            TEXT PRIMARY KEY,
  user_id       TEXT,           -- who ran the analysis (nullable for legacy rows)
  topic_name    TEXT NOT NULL,
  type          TEXT NOT NULL CHECK(type IN ('concept','situation','skill')),
  mmm_stage     TEXT CHECK(mmm_stage IN ('measure','model','manifest') OR mmm_stage IS NULL),
  primary_lens  TEXT,
  wants_type    TEXT CHECK(wants_type IN ('understanding','achieving') OR wants_type IS NULL),
  tags          TEXT,           -- JSON array as TEXT
  summary       TEXT,           -- 2-3 sentence abstract
  full_analysis TEXT NOT NULL,  -- full markdown document
  created_at    INTEGER NOT NULL,
  session_id    TEXT
);

CREATE INDEX IF NOT EXISTS idx_analyses_type ON analyses(type);
CREATE INDEX IF NOT EXISTS idx_analyses_mmm_stage ON analyses(mmm_stage);
CREATE INDEX IF NOT EXISTS idx_analyses_created_at ON analyses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analyses_user_created ON analyses(user_id, created_at DESC);

CREATE VIRTUAL TABLE IF NOT EXISTS analyses_fts USING fts5(
  topic_name,
  summary,
  content=analyses,
  content_rowid=rowid
);

-- Keep FTS index in sync
CREATE TRIGGER IF NOT EXISTS analyses_ai AFTER INSERT ON analyses BEGIN
  INSERT INTO analyses_fts(rowid, topic_name, summary) VALUES (new.rowid, new.topic_name, new.summary);
END;

CREATE TRIGGER IF NOT EXISTS analyses_ad AFTER DELETE ON analyses BEGIN
  INSERT INTO analyses_fts(analyses_fts, rowid, topic_name, summary) VALUES('delete', old.rowid, old.topic_name, old.summary);
END;

CREATE TRIGGER IF NOT EXISTS analyses_au AFTER UPDATE ON analyses BEGIN
  INSERT INTO analyses_fts(analyses_fts, rowid, topic_name, summary) VALUES('delete', old.rowid, old.topic_name, old.summary);
  INSERT INTO analyses_fts(rowid, topic_name, summary) VALUES (new.rowid, new.topic_name, new.summary);
END;
