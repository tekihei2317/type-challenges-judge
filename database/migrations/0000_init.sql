-- Migration number: 0000 	 2023-08-01T06:45:56.166Z

-- 問題
CREATE TABLE problem (
  id TEXT NOT NULL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty in ('warm', 'easy', 'medium', 'hard', 'extreme')),
  tests TEXT NOT NULL,
  playground_url TEXT NOT NULL
) STRICT;

-- ユーザー
CREATE TABLE user (
  user_id TEXT NOT NULL PRIMARY KEY,
  screen_name TEXT NOT NULL
) STRICT;

-- 提出
CREATE TABLE submission (
  id TEXT NOT NULL PRIMARY KEY,
  problem_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  code TEXT NOT NULL,
  code_length INT NOT NULL,
  status TEXT NOT NULL CHECK (status in ('Judging', 'Accepted', 'Wrong Answer')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (problem_id) REFERENCES problem (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE RESTRICT ON UPDATE CASCADE
) STRICT;

-- 提出の判定結果
CREATE TABLE judgement (
  submission_id TEXT NOT NULL PRIMARY KEY,
  status TEXT NOT NULL CHECK (status in ('Accepted', 'Wrong Answer')),
  diagnostics TEXT NOT NULL, -- コンパイルエラーメッセージの配列（JSONで保存する）
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (submission_id) REFERENCES submission (id) ON DELETE RESTRICT ON UPDATE CASCADE
) STRICT;

-- 問題の挑戦結果（ある問題をあるユーザーが正解しているか）
CREATE TABLE challenge_result (
  id INTEGER NOT NULL PRIMARY KEY,
  problem_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status in ('Accepted', 'Wrong Answer')),

  UNIQUE (problem_id, user_id),
  FOREIGN KEY (problem_id) REFERENCES problem (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE RESTRICT ON UPDATE CASCADE
) STRICT;
