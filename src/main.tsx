import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProblemsPage } from './pages/problems'
import { IndexPage } from './pages'
import { ProblemPage } from './pages/problems/[problemId]'
import { SubmitPage } from './pages/problems/[problemId]/submit'
import { SubmissionsPage } from './pages/problems/[problemId]/submissions'
import { ProblemLayout } from './components/ProblemLayout'
import { SubmissionPage } from './pages/problems/[problemId]/submissions/[submissionId]'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/problems" element={<ProblemsPage />} />
          <Route path="/problems/:problemId" element={<ProblemLayout />}>
            <Route path="submit" element={<SubmitPage />} />
            <Route path="submissions" element={<SubmissionsPage />} />
            <Route
              path="submissions/:submissionId"
              element={<SubmissionPage />}
            />
            <Route index element={<ProblemPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
)
