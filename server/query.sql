-- name: getAllProblems :many
select * from problem;

-- name: getProblem :one
select * from problem where id = ?;

-- name: CreateSubmission :one
insert into submission
  (id, problem_id, user_id, code, code_length, status)
values
  (?, ?, ?, ?, ?, ?)
returning *;

-- name: findSubmission :one
select * from submission where id = ?;

-- name: findUser :one
select * from user where user_id = ?;

-- name: findProblem :one
select * from problem where id = ?;

-- name: findMySubmissionsToProblem :many
select
  submission.id,
  submission.code,
  submission.code_length as codeLength,
  submission.status,
  submission.created_at as createdAt,
  user.user_id as userUserId,
  user.screen_name as userScreenName
from
  submission submission
  inner join user user on submission.user_id = user.user_id
where
  submission.problem_id = @problemId and
  submission.user_id = @userId
order by submission.created_at desc;

-- name: countSubmissionsToProblem :one
select count(*) as submissionCount from submission where problem_id = @problemId;

-- name: findSubmissionsToProblem :many
select
  submission.id,
  submission.code,
  submission.code_length as codeLength,
  submission.status,
  submission.created_at as createdAt,
  user.user_id as userUserId,
  user.screen_name as userScreenName
from
  submission submission
  inner join user user on submission.userId = user.userId
where
  submission.problem_id = @problemId
order by submission.created_at desc
limit ?
offset ?;
