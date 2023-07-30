-- Migration number: 0000 	 2023-07-30T10:35:20.118Z

-- 問題
CREATE TABLE Problem (
  id TEXT NOT NULL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty in ('warm', 'easy', 'medium', 'hard', 'extreme')),
  tests TEXT NOT NULL,
  playgroundUrl TEXT NOT NULL
) STRICT;

-- ユーザー
CREATE TABLE User (
  userId TEXT NOT NULL PRIMARY KEY,
  screenName TEXT NOT NULL
) STRICT;

-- 提出
CREATE TABLE Submission (
  id TEXT NOT NULL PRIMARY KEY,
  problemId TEXT NOT NULL,
  userId TEXT NOT NULL,
  code TEXT NOT NULL,
  codeLength INT NOT NULL,
  status TEXT NOT NULL CHECK (status in ('Judging', 'Accepted', 'Wrong Answer')),
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (problemId) REFERENCES Problem (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (userId) REFERENCES User (userId) ON DELETE RESTRICT ON UPDATE CASCADE
) STRICT;

-- 提出の判定結果
CREATE TABLE Judgement (
  submissionId TEXT NOT NULL PRIMARY KEY,
  status TEXT NOT NULL CHECK (status in ('Accepted', 'Wrong Answer')),
  diagnostics TEXT NOT NULL, -- コンパイルエラーメッセージの配列（JSONで保存する）
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (submissionId) REFERENCES Submission (id) ON DELETE RESTRICT ON UPDATE CASCADE
) STRICT;

-- 問題の挑戦結果（ある問題をあるユーザーが正解しているか）
CREATE TABLE ChallengeResult (
  id INTEGER NOT NULL PRIMARY KEY,
  problemId TEXT NOT NULL,
  userId TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status in ('Accepted', 'Wrong Answer')),

  UNIQUE (problemId, userId),
  FOREIGN KEY (problemId) REFERENCES Problem (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (userId) REFERENCES User (userId) ON DELETE RESTRICT ON UPDATE CASCADE
) STRICT;
