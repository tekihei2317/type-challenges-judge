import { Flex, Button } from '@chakra-ui/react'
import { PageType } from '../utils/pagination'

type PaginationProps = {
  pages: PageType[]
  currentPage: number
  handlePageClick: (page: PageType) => void
}

export const Pagination = ({
  pages,
  currentPage,
  handlePageClick,
}: PaginationProps) => {
  return (
    <Flex gap="1">
      {pages.map((page) => (
        <Button
          key={page}
          colorScheme={'blue'}
          variant={page === currentPage ? 'solid' : 'outline'}
          onClick={() => handlePageClick(page)}
        >
          {page === 'LEFT' ? '«' : page === 'RIGHT' ? '»' : page}
        </Button>
      ))}
    </Flex>
  )
}
