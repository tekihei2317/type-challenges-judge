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

-- name: CreateJudgement :one
insert into judgement
  (submission_id, status, diagnostics)
values
  (?, ?, ?)
returning *;

-- name: findChallengeResult :one
select * from challenge_result
where problem_id = ? and user_id = ?;

-- name: createChallengeResult :one
insert into challenge_result
  (problem_id, user_id, status)
values
  (?, ?, ?)
returning *;

-- name: updateChallengeResultStatus :one
update challenge_result
set status = ?
where problem_id = ? and user_id = ?
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
  submission.code_length,
  submission.status,
  submission.created_at,
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
  submission.code_length,
  submission.status,
  submission.created_at,
  user.user_id as userUserId,
  user.screen_name as userScreenName
from
  submission submission
  inner join user on submission.user_id = user.user_id
where
  submission.problem_id = @problemId
order by submission.created_at desc
limit ?
offset ?;

-- name: findUsersChallengeResults :many
select * from challenge_result where user_id = ?;

-- name: findProblemCounts :many
select
  problem.difficulty,
  count(problem.id) as problem_count
from
  problem
group by
  problem.difficulty;

-- name: calculateUserProgress :many
select
  problem.difficulty,
  sum(case when challenge_result.status = 'Accepted' then 1 else 0 end) as accepted_count,
  sum(case when challenge_result.status = 'Wrong Answer' then 1 else 0 end) as wrong_answer_count
from
  challenge_result
  inner join problem on challenge_result.problem_id = problem.id
where
  challenge_result.user_id = ?
group by
  problem.difficulty;

-- name: calculateRankings :many
select
  user.user_id,
  user.screen_name,
  accepted_count.accepted_count,
  rank() over (order by accepted_count.accepted_count desc) as user_rank
from
  (
    select
      challenge_result.user_id,
      count(*) as accepted_count
    from
      challenge_result
    where
      challenge_result.status = 'Accepted'
    group by
      challenge_result.user_id
    order by
      accepted_count desc
    limit 100
  ) accepted_count
  inner join user
    on user.user_id = accepted_count.user_id
;
