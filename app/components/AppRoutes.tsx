import { Route, Routes } from 'react-router-dom'
import { ProblemLayout } from './ProblemLayout'
import { IndexPage } from '../pages'
import { ProblemPage } from '../pages/problems/[problemId]'
import { SubmissionsPage } from '../pages/problems/[problemId]/submissions'
import { SubmissionPage } from '../pages/problems/[problemId]/submissions/[submissionId]'
import { SubmitPage } from '../pages/problems/[problemId]/submit'
import { DefaultLayout } from './DefaultLayout'
import { ProgressPage } from '../pages/progress'

export const AppRoutes = () => {
  return (
    <DefaultLayout>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/progress" element={<ProgressPage />}></Route>
        <Route path="/problems/:problemId" element={<ProblemLayout />}>
          <Route path="submit" element={<SubmitPage />} />
          <Route path="submissions" element={<SubmissionsPage />} />
          <Route index element={<ProblemPage />} />
          <Route
            path="submissions/:submissionId"
            element={<SubmissionPage />}
          />
        </Route>
      </Routes>
    </DefaultLayout>
  )
}
