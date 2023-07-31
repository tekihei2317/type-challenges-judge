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
