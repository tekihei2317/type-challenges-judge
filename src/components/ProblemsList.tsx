import { Problem } from '../model'
import { ProblemStatusMap } from '../pages'
import { Stack, Text, Wrap } from '@chakra-ui/react'
import { ProblemButton } from './ProblemButton'

type ProblemListProps = {
  warmupProblems: Problem[]
  easyProblems: Problem[]
  mediumProblems: Problem[]
  hardProblems: Problem[]
  extremeProblems: Problem[]
  statusMap: ProblemStatusMap
}

export const ProblemList = ({
  warmupProblems,
  easyProblems,
  mediumProblems,
  hardProblems,
  extremeProblems,
  statusMap,
}: ProblemListProps) => {
  return (
    <Stack spacing={8}>
      <Stack p={1}>
        <Text fontSize={'xl'} fontWeight={'bold'}>
          Warmup
        </Text>
        <Wrap p={1}>
          {warmupProblems.map((problem) => (
            <ProblemButton
              problem={problem}
              status={statusMap[problem.id]}
              key={problem.id}
            />
          ))}
        </Wrap>
      </Stack>
      <Stack>
        <Text fontSize={'xl'} fontWeight={'bold'}>
          Easy
        </Text>
        <Wrap p={1}>
          {easyProblems.map((problem) => (
            <ProblemButton
              problem={problem}
              status={statusMap[problem.id]}
              key={problem.id}
            />
          ))}
        </Wrap>
      </Stack>
      <Stack>
        <Text fontSize={'xl'} fontWeight={'bold'}>
          Medium
        </Text>
        <Wrap p={1}>
          {mediumProblems.map((problem) => (
            <ProblemButton
              problem={problem}
              status={statusMap[problem.id]}
              key={problem.id}
            />
          ))}
        </Wrap>
      </Stack>
      <Stack>
        <Text fontSize={'xl'} fontWeight={'bold'}>
          Hard
        </Text>
        <Wrap p={1}>
          {hardProblems.map((problem) => (
            <ProblemButton
              problem={problem}
              status={statusMap[problem.id]}
              key={problem.id}
            />
          ))}
        </Wrap>
      </Stack>
      <Stack p={1}>
        <Text fontSize={'xl'} fontWeight={'bold'}>
          Extreme
        </Text>
        <Wrap p={1}>
          {extremeProblems.map((problem) => (
            <ProblemButton
              problem={problem}
              status={statusMap[problem.id]}
              key={problem.id}
            />
          ))}
        </Wrap>
      </Stack>
    </Stack>
  )
}
