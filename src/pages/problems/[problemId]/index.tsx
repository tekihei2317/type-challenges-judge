import { useOutletContext } from 'react-router-dom'
import { Button, Wrap, Box, Link } from '@chakra-ui/react'
import { toGitHubUrl } from '../../../utils/type-challenges'
import { ProblemLayoutContext } from '../../../components/ProblemLayout'
import { CodeBlock } from '../../../components/CodeBlock'

export const ProblemPage = () => {
  const { problem } = useOutletContext<ProblemLayoutContext>()

  return (
    <>
      {problem === undefined ? (
        <></>
      ) : (
        <Box>
          <Wrap p={1} pl={0.5} mb={6}>
            <Link
              href={problem.playground_url}
              isExternal
              style={{ textDecoration: 'none' }}
            >
              <Button colorScheme={'blue'}>挑戦する</Button>
            </Link>
            <Link
              href={toGitHubUrl(problem)}
              isExternal
              style={{ textDecoration: 'none' }}
            >
              <Button variant={'outline'}>GitHubで見る</Button>
            </Link>
          </Wrap>
          <CodeBlock code={problem.content} />
        </Box>
      )}
    </>
  )
}
