-- name: getAllProblems :many
select * from Problem;

-- name: getProblem :one
select * from Problem where id = ?;

-- name: CreateSubmission :one
insert into Submission
  (id, problemid, userid, code, codelength, status)
values
  (?, ?, ?, ?, ?, ?)
returning *;

-- name: findSubmission :one
select * from Submission where id = ?;

-- name: findUser :one
select * from User where userId = ?;

-- name: findProblem :one
select * from Problem where id = ?;

-- name: findMySubmissionsToProblem :many
select
  submission.id,
  submission.code,
  submission.codeLength as codeLength,
  submission.status,
  submission.createdAt as createdAt,
  user.userId as userUserId,
  user.screenName as userScreenName
from
  Submission submission
  inner join User user on submission.userId = user.userId
where
  submission.problemId = @problemId and
  submission.userId = @userId
order by submission.createdAt desc;

-- name: countSubmissionsToProblem :one
select count(*) as submissionCount from Submission where problemId = @problemId;

-- name: findSubmissionsToProblem :many
select
  submission.id,
  submission.code,
  submission.codeLength as codeLength,
  submission.status,
  submission.createdAt as createdAt,
  user.userId as userUserId,
  user.screenName as userScreenName
from
  Submission submission
  inner join User user on submission.userId = user.userId
where
  Submission.problemId = @problemId
order by submission.createdAt desc
limit ?
offset ?;
