import { Badge } from '@chakra-ui/react'
import { SubmissionStatus } from '../model'

type SubmissionStatusBadgeProps = {
  children: SubmissionStatus
}

function statusToColor(status: SubmissionStatus) {
  if (status === 'Judging') return 'gray'
  if (status === 'Accepted') return 'green'
  return 'red'
}

export const SubmissionStatusBadge = ({
  children,
}: SubmissionStatusBadgeProps) => {
  return (
    <Badge colorScheme={statusToColor(children)} py={0.5} px={2}>
      {children}
    </Badge>
  )
}
