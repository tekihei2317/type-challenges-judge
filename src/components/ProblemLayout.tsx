import { Container, Tab, Tabs, Text, TabList } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { fetchProblem } from '../use-cases/fetch-problem'
import { Problem } from '../model'

type Tab = {
  name: string
  path: string
}

export type ProblemLayoutContext = {
  problem: Problem
}

export const ProblemLayout = () => {
  const { problemId } = useParams()

  const [problem, setProblem] = useState<Problem | undefined>()

  useEffect(() => {
    const loadData = async () => {
      if (problemId === undefined) return
      setProblem(await fetchProblem(problemId))
    }
    loadData()
  }, [problemId])

  const basePath = `/problems/${problemId}`
  const tabs: Tab[] = [
    { name: '問題', path: basePath },
    { name: '提出', path: `${basePath}/submit` },
    { name: '提出一覧', path: `${basePath}/submissions` },
  ]
  const navigate = useNavigate()

  const handleTabChange = (index: number) => {
    navigate(tabs[index].path)
  }

  return (
    <Container maxW={'container.xl'}>
      <Text fontSize="xl" fontWeight={'bold'} mt={8}>
        {problem?.title}
      </Text>
      <Tabs variant={'enclosed'} onChange={handleTabChange} mt={6} mb={4}>
        <TabList>
          {tabs.map((tab) => (
            <Tab key={tab.name}>{tab.name}</Tab>
          ))}
        </TabList>
      </Tabs>
      {problem !== undefined && <Outlet context={{ problem }} />}
    </Container>
  )
}
