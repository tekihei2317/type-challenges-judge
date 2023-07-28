import { Problem, ProblemResultStatus } from '../model'
import { Link } from 'react-router-dom'
import { Box } from '@chakra-ui/react'

type ProblemButtonProps = {
  problem: Problem
  status: ProblemResultStatus | undefined
}

export const ProblemButton = ({ problem, status }: ProblemButtonProps) => {
  return (
    <Link to={`/problems/${problem.id}`}>
      <Box
        w={40}
        textAlign={'left'}
        backgroundColor={'gray.100'}
        px={4}
        py={2.5}
        fontWeight={600}
        borderRadius={4}
        whiteSpace={'nowrap'}
        textOverflow={'ellipsis'}
        overflow={'hidden'}
        background={
          status === 'Accepted'
            ? 'green.200'
            : status === 'Wrong Answer'
            ? 'yellow.100'
            : undefined
        }
      >
        {problem.title}
      </Box>
    </Link>
  )
}
