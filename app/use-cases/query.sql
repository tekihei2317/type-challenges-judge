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
