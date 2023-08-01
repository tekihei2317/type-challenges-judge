CREATE TABLE d1_migrations(
		id         INTEGER PRIMARY KEY AUTOINCREMENT,
		name       TEXT UNIQUE,
		applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE TABLE sqlite_sequence(name,seq);
CREATE TABLE Problem (
  id TEXT NOT NULL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty in ('warm', 'easy', 'medium', 'hard', 'extreme')),
  tests TEXT NOT NULL,
  playgroundUrl TEXT NOT NULL
) STRICT;
CREATE TABLE User (
  userId TEXT NOT NULL PRIMARY KEY,
  screenName TEXT NOT NULL
) STRICT;
CREATE TABLE Submission (
  id TEXT NOT NULL PRIMARY KEY,
  problemId TEXT NOT NULL,
  userId TEXT NOT NULL,
  code TEXT NOT NULL,
  codeLength INT NOT NULL,
  status TEXT NOT NULL CHECK (status in ('Judging', 'Accepted', 'Wrong Answer')),
  createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (problemId) REFERENCES Problem (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (userId) REFERENCES User (userId) ON DELETE RESTRICT ON UPDATE CASCADE
) STRICT;
CREATE TABLE Judgement (
  submissionId TEXT NOT NULL PRIMARY KEY,
  status TEXT NOT NULL CHECK (status in ('Accepted', 'Wrong Answer')),
  diagnostics TEXT NOT NULL, -- コンパイルエラーメッセージの配列（JSONで保存する）
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (submissionId) REFERENCES Submission (id) ON DELETE RESTRICT ON UPDATE CASCADE
) STRICT;
CREATE TABLE ChallengeResult (
  id INTEGER NOT NULL PRIMARY KEY,
  problemId TEXT NOT NULL,
  userId TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status in ('Accepted', 'Wrong Answer')),

  UNIQUE (problemId, userId),
  FOREIGN KEY (problemId) REFERENCES Problem (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (userId) REFERENCES User (userId) ON DELETE RESTRICT ON UPDATE CASCADE
) STRICT;
