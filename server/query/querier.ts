// Code generated by sqlc-gen-ts-d1. DO NOT EDIT.
// versions:
//   sqlc v1.19.1
//   sqlc-gen-ts-d1 v0.0.0-a@254c24db5bcb2e1e16559e7f8498d7fa673ada31

import { D1Database, D1Result } from "@cloudflare/workers-types/2022-11-30"

const getAllProblemsQuery = `-- name: getAllProblems :many
select id, title, content, difficulty, tests, playground_url from problem`;

export type getAllProblemsRow = {
  id: string;
  title: string;
  content: string;
  difficulty: string;
  tests: string;
  playgroundUrl: string;
};

type RawgetAllProblemsRow = {
  id: string;
  title: string;
  content: string;
  difficulty: string;
  tests: string;
  playground_url: string;
};

export async function getAllProblems(
  d1: D1Database
): Promise<D1Result<getAllProblemsRow>> {
  return await d1
    .prepare(getAllProblemsQuery)
    .all<RawgetAllProblemsRow>()
    .then((r: D1Result<RawgetAllProblemsRow>) => { return {
      ...r,
      results: r.results.map((raw: RawgetAllProblemsRow) => { return {
        id: raw.id,
        title: raw.title,
        content: raw.content,
        difficulty: raw.difficulty,
        tests: raw.tests,
        playgroundUrl: raw.playground_url,
      }}),
    }});
}

const getProblemQuery = `-- name: getProblem :one
select id, title, content, difficulty, tests, playground_url from problem where id = ?`;

export type getProblemParams = {
  id: string;
};

export type getProblemRow = {
  id: string;
  title: string;
  content: string;
  difficulty: string;
  tests: string;
  playgroundUrl: string;
};

type RawgetProblemRow = {
  id: string;
  title: string;
  content: string;
  difficulty: string;
  tests: string;
  playground_url: string;
};

export async function getProblem(
  d1: D1Database,
  args: getProblemParams
): Promise<getProblemRow | null> {
  return await d1
    .prepare(getProblemQuery)
    .bind(args.id)
    .first<RawgetProblemRow | null>()
    .then((raw: RawgetProblemRow | null) => raw ? {
      id: raw.id,
      title: raw.title,
      content: raw.content,
      difficulty: raw.difficulty,
      tests: raw.tests,
      playgroundUrl: raw.playground_url,
    } : null);
}

const createSubmissionQuery = `-- name: CreateSubmission :one
insert into submission
  (id, problem_id, user_id, code, code_length, status)
values
  (?, ?, ?, ?, ?, ?)
returning id, problem_id, user_id, code, code_length, status, created_at`;

export type CreateSubmissionParams = {
  id: string;
  problemId: string;
  userId: string;
  code: string;
  codeLength: number | string;
  status: string;
};

export type CreateSubmissionRow = {
  id: string;
  problemId: string;
  userId: string;
  code: string;
  codeLength: number | string;
  status: string;
  createdAt: string;
};

type RawCreateSubmissionRow = {
  id: string;
  problem_id: string;
  user_id: string;
  code: string;
  code_length: number | string;
  status: string;
  created_at: string;
};

export async function createSubmission(
  d1: D1Database,
  args: CreateSubmissionParams
): Promise<CreateSubmissionRow | null> {
  return await d1
    .prepare(createSubmissionQuery)
    .bind(args.id, args.problemId, args.userId, args.code, args.codeLength, args.status)
    .first<RawCreateSubmissionRow | null>()
    .then((raw: RawCreateSubmissionRow | null) => raw ? {
      id: raw.id,
      problemId: raw.problem_id,
      userId: raw.user_id,
      code: raw.code,
      codeLength: raw.code_length,
      status: raw.status,
      createdAt: raw.created_at,
    } : null);
}

const createJudgementQuery = `-- name: CreateJudgement :one
insert into judgement
  (submission_id, status, diagnostics)
values
  (?, ?, ?)
returning submission_id, status, diagnostics, created_at`;

export type CreateJudgementParams = {
  submissionId: string;
  status: string;
  diagnostics: string;
};

export type CreateJudgementRow = {
  submissionId: string;
  status: string;
  diagnostics: string;
  createdAt: string | null;
};

type RawCreateJudgementRow = {
  submission_id: string;
  status: string;
  diagnostics: string;
  created_at: string | null;
};

export async function createJudgement(
  d1: D1Database,
  args: CreateJudgementParams
): Promise<CreateJudgementRow | null> {
  return await d1
    .prepare(createJudgementQuery)
    .bind(args.submissionId, args.status, args.diagnostics)
    .first<RawCreateJudgementRow | null>()
    .then((raw: RawCreateJudgementRow | null) => raw ? {
      submissionId: raw.submission_id,
      status: raw.status,
      diagnostics: raw.diagnostics,
      createdAt: raw.created_at,
    } : null);
}

const findChallengeResultQuery = `-- name: findChallengeResult :one
select id, problem_id, user_id, status from challenge_result
where problem_id = ? and user_id = ?`;

export type findChallengeResultParams = {
  problemId: string;
  userId: string;
};

export type findChallengeResultRow = {
  id: number;
  problemId: string;
  userId: string;
  status: string;
};

type RawfindChallengeResultRow = {
  id: number;
  problem_id: string;
  user_id: string;
  status: string;
};

export async function findChallengeResult(
  d1: D1Database,
  args: findChallengeResultParams
): Promise<findChallengeResultRow | null> {
  return await d1
    .prepare(findChallengeResultQuery)
    .bind(args.problemId, args.userId)
    .first<RawfindChallengeResultRow | null>()
    .then((raw: RawfindChallengeResultRow | null) => raw ? {
      id: raw.id,
      problemId: raw.problem_id,
      userId: raw.user_id,
      status: raw.status,
    } : null);
}

const createChallengeResultQuery = `-- name: createChallengeResult :one
insert into challenge_result
  (problem_id, user_id, status)
values
  (?, ?, ?)
returning id, problem_id, user_id, status`;

export type createChallengeResultParams = {
  problemId: string;
  userId: string;
  status: string;
};

export type createChallengeResultRow = {
  id: number;
  problemId: string;
  userId: string;
  status: string;
};

type RawcreateChallengeResultRow = {
  id: number;
  problem_id: string;
  user_id: string;
  status: string;
};

export async function createChallengeResult(
  d1: D1Database,
  args: createChallengeResultParams
): Promise<createChallengeResultRow | null> {
  return await d1
    .prepare(createChallengeResultQuery)
    .bind(args.problemId, args.userId, args.status)
    .first<RawcreateChallengeResultRow | null>()
    .then((raw: RawcreateChallengeResultRow | null) => raw ? {
      id: raw.id,
      problemId: raw.problem_id,
      userId: raw.user_id,
      status: raw.status,
    } : null);
}

const updateChallengeResultStatusQuery = `-- name: updateChallengeResultStatus :one
update challenge_result
set status = ?
where problem_id = ? and user_id = ?
returning id, problem_id, user_id, status`;

export type updateChallengeResultStatusParams = {
  status: string;
  problemId: string;
  userId: string;
};

export type updateChallengeResultStatusRow = {
  id: number;
  problemId: string;
  userId: string;
  status: string;
};

type RawupdateChallengeResultStatusRow = {
  id: number;
  problem_id: string;
  user_id: string;
  status: string;
};

export async function updateChallengeResultStatus(
  d1: D1Database,
  args: updateChallengeResultStatusParams
): Promise<updateChallengeResultStatusRow | null> {
  return await d1
    .prepare(updateChallengeResultStatusQuery)
    .bind(args.status, args.problemId, args.userId)
    .first<RawupdateChallengeResultStatusRow | null>()
    .then((raw: RawupdateChallengeResultStatusRow | null) => raw ? {
      id: raw.id,
      problemId: raw.problem_id,
      userId: raw.user_id,
      status: raw.status,
    } : null);
}

const findSubmissionQuery = `-- name: findSubmission :one
select id, problem_id, user_id, code, code_length, status, created_at from submission where id = ?`;

export type findSubmissionParams = {
  id: string;
};

export type findSubmissionRow = {
  id: string;
  problemId: string;
  userId: string;
  code: string;
  codeLength: number | string;
  status: string;
  createdAt: string;
};

type RawfindSubmissionRow = {
  id: string;
  problem_id: string;
  user_id: string;
  code: string;
  code_length: number | string;
  status: string;
  created_at: string;
};

export async function findSubmission(
  d1: D1Database,
  args: findSubmissionParams
): Promise<findSubmissionRow | null> {
  return await d1
    .prepare(findSubmissionQuery)
    .bind(args.id)
    .first<RawfindSubmissionRow | null>()
    .then((raw: RawfindSubmissionRow | null) => raw ? {
      id: raw.id,
      problemId: raw.problem_id,
      userId: raw.user_id,
      code: raw.code,
      codeLength: raw.code_length,
      status: raw.status,
      createdAt: raw.created_at,
    } : null);
}

const findUserQuery = `-- name: findUser :one
select user_id, screen_name from user where user_id = ?`;

export type findUserParams = {
  userId: string;
};

export type findUserRow = {
  userId: string;
  screenName: string;
};

type RawfindUserRow = {
  user_id: string;
  screen_name: string;
};

export async function findUser(
  d1: D1Database,
  args: findUserParams
): Promise<findUserRow | null> {
  return await d1
    .prepare(findUserQuery)
    .bind(args.userId)
    .first<RawfindUserRow | null>()
    .then((raw: RawfindUserRow | null) => raw ? {
      userId: raw.user_id,
      screenName: raw.screen_name,
    } : null);
}

const findProblemQuery = `-- name: findProblem :one
select id, title, content, difficulty, tests, playground_url from problem where id = ?`;

export type findProblemParams = {
  id: string;
};

export type findProblemRow = {
  id: string;
  title: string;
  content: string;
  difficulty: string;
  tests: string;
  playgroundUrl: string;
};

type RawfindProblemRow = {
  id: string;
  title: string;
  content: string;
  difficulty: string;
  tests: string;
  playground_url: string;
};

export async function findProblem(
  d1: D1Database,
  args: findProblemParams
): Promise<findProblemRow | null> {
  return await d1
    .prepare(findProblemQuery)
    .bind(args.id)
    .first<RawfindProblemRow | null>()
    .then((raw: RawfindProblemRow | null) => raw ? {
      id: raw.id,
      title: raw.title,
      content: raw.content,
      difficulty: raw.difficulty,
      tests: raw.tests,
      playgroundUrl: raw.playground_url,
    } : null);
}

const findMySubmissionsToProblemQuery = `-- name: findMySubmissionsToProblem :many
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
  submission.problem_id = ?1 and
  submission.user_id = ?2
order by submission.created_at desc`;

export type findMySubmissionsToProblemParams = {
  problemId: string;
  userId: string;
};

export type findMySubmissionsToProblemRow = {
  id: string;
  code: string;
  codeLength: number | string;
  status: string;
  createdAt: string;
  userUserId: string;
  userScreenName: string;
};

type RawfindMySubmissionsToProblemRow = {
  id: string;
  code: string;
  code_length: number | string;
  status: string;
  created_at: string;
  userUserId: string;
  userScreenName: string;
};

export async function findMySubmissionsToProblem(
  d1: D1Database,
  args: findMySubmissionsToProblemParams
): Promise<D1Result<findMySubmissionsToProblemRow>> {
  return await d1
    .prepare(findMySubmissionsToProblemQuery)
    .bind(args.problemId, args.userId)
    .all<RawfindMySubmissionsToProblemRow>()
    .then((r: D1Result<RawfindMySubmissionsToProblemRow>) => { return {
      ...r,
      results: r.results.map((raw: RawfindMySubmissionsToProblemRow) => { return {
        id: raw.id,
        code: raw.code,
        codeLength: raw.code_length,
        status: raw.status,
        createdAt: raw.created_at,
        userUserId: raw.userUserId,
        userScreenName: raw.userScreenName,
      }}),
    }});
}

const countSubmissionsToProblemQuery = `-- name: countSubmissionsToProblem :one
select count(*) as submissionCount from submission where problem_id = ?1`;

export type countSubmissionsToProblemParams = {
  problemId: string;
};

export type countSubmissionsToProblemRow = {
  submissionCount: number;
};

export async function countSubmissionsToProblem(
  d1: D1Database,
  args: countSubmissionsToProblemParams
): Promise<countSubmissionsToProblemRow | null> {
  return await d1
    .prepare(countSubmissionsToProblemQuery)
    .bind(args.problemId)
    .first<countSubmissionsToProblemRow | null>();
}

const findSubmissionsToProblemQuery = `-- name: findSubmissionsToProblem :many
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
  submission.problem_id = ?
order by submission.created_at desc
limit ?
offset ?`;

export type findSubmissionsToProblemParams = {
  problemId: string;
  limit: number;
  offset: number;
};

export type findSubmissionsToProblemRow = {
  id: string;
  code: string;
  codeLength: number | string;
  status: string;
  createdAt: string;
  userUserId: string;
  userScreenName: string;
};

type RawfindSubmissionsToProblemRow = {
  id: string;
  code: string;
  code_length: number | string;
  status: string;
  created_at: string;
  userUserId: string;
  userScreenName: string;
};

export async function findSubmissionsToProblem(
  d1: D1Database,
  args: findSubmissionsToProblemParams
): Promise<D1Result<findSubmissionsToProblemRow>> {
  return await d1
    .prepare(findSubmissionsToProblemQuery)
    .bind(args.problemId, args.limit, args.offset)
    .all<RawfindSubmissionsToProblemRow>()
    .then((r: D1Result<RawfindSubmissionsToProblemRow>) => { return {
      ...r,
      results: r.results.map((raw: RawfindSubmissionsToProblemRow) => { return {
        id: raw.id,
        code: raw.code,
        codeLength: raw.code_length,
        status: raw.status,
        createdAt: raw.created_at,
        userUserId: raw.userUserId,
        userScreenName: raw.userScreenName,
      }}),
    }});
}

const findUsersChallengeResultsQuery = `-- name: findUsersChallengeResults :many
select id, problem_id, user_id, status from challenge_result where user_id = ?`;

export type findUsersChallengeResultsParams = {
  userId: string;
};

export type findUsersChallengeResultsRow = {
  id: number;
  problemId: string;
  userId: string;
  status: string;
};

type RawfindUsersChallengeResultsRow = {
  id: number;
  problem_id: string;
  user_id: string;
  status: string;
};

export async function findUsersChallengeResults(
  d1: D1Database,
  args: findUsersChallengeResultsParams
): Promise<D1Result<findUsersChallengeResultsRow>> {
  return await d1
    .prepare(findUsersChallengeResultsQuery)
    .bind(args.userId)
    .all<RawfindUsersChallengeResultsRow>()
    .then((r: D1Result<RawfindUsersChallengeResultsRow>) => { return {
      ...r,
      results: r.results.map((raw: RawfindUsersChallengeResultsRow) => { return {
        id: raw.id,
        problemId: raw.problem_id,
        userId: raw.user_id,
        status: raw.status,
      }}),
    }});
}

const findProblemCountsQuery = `-- name: findProblemCounts :many
select
  problem.difficulty,
  count(problem.id) as problem_count
from
  problem
group by
  problem.difficulty`;

export type findProblemCountsRow = {
  difficulty: string;
  problemCount: number;
};

type RawfindProblemCountsRow = {
  difficulty: string;
  problem_count: number;
};

export async function findProblemCounts(
  d1: D1Database
): Promise<D1Result<findProblemCountsRow>> {
  return await d1
    .prepare(findProblemCountsQuery)
    .all<RawfindProblemCountsRow>()
    .then((r: D1Result<RawfindProblemCountsRow>) => { return {
      ...r,
      results: r.results.map((raw: RawfindProblemCountsRow) => { return {
        difficulty: raw.difficulty,
        problemCount: raw.problem_count,
      }}),
    }});
}

const calculateUserProgressQuery = `-- name: calculateUserProgress :many
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
  problem.difficulty`;

export type calculateUserProgressParams = {
  userId: string;
};

export type calculateUserProgressRow = {
  difficulty: string;
  acceptedCount: number | string | null;
  wrongAnswerCount: number | string | null;
};

type RawcalculateUserProgressRow = {
  difficulty: string;
  accepted_count: number | string | null;
  wrong_answer_count: number | string | null;
};

export async function calculateUserProgress(
  d1: D1Database,
  args: calculateUserProgressParams
): Promise<D1Result<calculateUserProgressRow>> {
  return await d1
    .prepare(calculateUserProgressQuery)
    .bind(args.userId)
    .all<RawcalculateUserProgressRow>()
    .then((r: D1Result<RawcalculateUserProgressRow>) => { return {
      ...r,
      results: r.results.map((raw: RawcalculateUserProgressRow) => { return {
        difficulty: raw.difficulty,
        acceptedCount: raw.accepted_count,
        wrongAnswerCount: raw.wrong_answer_count,
      }}),
    }});
}

const calculateRankingsQuery = `-- name: calculateRankings :many
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
    on user.user_id = accepted_count.user_id`;

export type calculateRankingsRow = {
  userId: string;
  screenName: string;
  acceptedCount: number;
  userRank: number | string | null;
};

type RawcalculateRankingsRow = {
  user_id: string;
  screen_name: string;
  accepted_count: number;
  user_rank: number | string | null;
};

export async function calculateRankings(
  d1: D1Database
): Promise<D1Result<calculateRankingsRow>> {
  return await d1
    .prepare(calculateRankingsQuery)
    .all<RawcalculateRankingsRow>()
    .then((r: D1Result<RawcalculateRankingsRow>) => { return {
      ...r,
      results: r.results.map((raw: RawcalculateRankingsRow) => { return {
        userId: raw.user_id,
        screenName: raw.screen_name,
        acceptedCount: raw.accepted_count,
        userRank: raw.user_rank,
      }}),
    }});
}

