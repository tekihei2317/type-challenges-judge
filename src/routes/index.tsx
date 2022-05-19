import { Route, Routes } from 'react-router-dom'
import { ProblemLayout } from '../components/ProblemLayout'
import { IndexPage } from '../pages'
import { ProblemsPage } from '../pages/problems'
import { ProblemPage } from '../pages/problems/[problemId]'
import { SubmissionsPage } from '../pages/problems/[problemId]/submissions'
import { SubmissionPage } from '../pages/problems/[problemId]/submissions/[submissionId]'
import { SubmitPage } from '../pages/problems/[problemId]/submit'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/problems" element={<ProblemsPage />} />
      <Route path="/problems/:problemId" element={<ProblemLayout />}>
        <Route path="submit" element={<SubmitPage />} />
        <Route path="submissions" element={<SubmissionsPage />} />
        <Route path="submissions/:submissionId" element={<SubmissionPage />} />
        <Route index element={<ProblemPage />} />
      </Route>
    </Routes>
  )
}
