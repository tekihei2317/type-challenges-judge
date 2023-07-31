import { Container, Text, Flex, Button } from '@chakra-ui/react'
import { Link, Outlet, useLoaderData, useLocation } from '@remix-run/react'
import { fetchProblem } from '../use-cases/fetch-problem'
import { Problem } from '../model'
import { json, LoaderArgs } from '@remix-run/cloudflare'
import invariant from 'tiny-invariant'

export type ProblemLayoutContext = {
  problem: Problem
}

type TabButtonProps = {
  path: string
  currentPath: string
  children: string
}

const TabButton = ({ path, currentPath, children }: TabButtonProps) => {
  const isActive = path === currentPath
  const activeProps = {
    border: '1px',
    borderBottom: 0,
    borderColor: 'gray.300',
    color: 'blue.600',
  }

  return (
    <Link to={path}>
      <Button
        variant={'ghost'}
        fontWeight={'normal'}
        borderBottomLeftRadius={0}
        borderBottomRightRadius={0}
        {...(isActive ? activeProps : {})}
      >
        {children}
      </Button>
    </Link>
  )
}

export async function loader({ context, params }: LoaderArgs) {
  invariant(params.problemId, 'params.problemId is required')
  const problem = await fetchProblem(context.env.DB, params.problemId)

  return json({ problem })
}

export default function ProblemLayout() {
  const { problem } = useLoaderData<typeof loader>()

  const location = useLocation()

  const basePath = `/problems/${problem.id}`
  const paths = {
    problem: basePath,
    submit: `${basePath}/submit`,
    submissions: `${basePath}/submissions`,
  }

  return (
    <Container maxW={'container.xl'}>
      <Text fontSize="xl" fontWeight={'bold'} mt={8}>
        {problem.title}
      </Text>
      <Flex
        gap={1}
        borderBottom={'1px'}
        borderBottomColor={'gray.300'}
        mt={8}
        mb={6}
      >
        <TabButton path={paths.problem} currentPath={location.pathname}>
          問題
        </TabButton>
        <TabButton path={paths.submit} currentPath={location.pathname}>
          提出
        </TabButton>
        <TabButton path={paths.submissions} currentPath={location.pathname}>
          提出一覧
        </TabButton>
      </Flex>
      {problem !== undefined && <Outlet context={{ problem }} />}
    </Container>
  )
}
