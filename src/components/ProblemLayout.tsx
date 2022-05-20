import { Container, Tab, Tabs, Text, TabList } from '@chakra-ui/react'
import { Outlet, useNavigate } from 'react-router-dom'

type Tab = {
  name: string
  path: string
}

export const ProblemLayout = () => {
  const problemId = 1

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
      <Text fontSize="2xl" fontWeight={'bold'}>
        Pick
      </Text>
      <Tabs variant={'enclosed'} onChange={handleTabChange} mt={8} mb={4}>
        <TabList>
          {tabs.map((tab) => (
            <Tab key={tab.name}>{tab.name}</Tab>
          ))}
        </TabList>
      </Tabs>
      <Outlet />
    </Container>
  )
}
