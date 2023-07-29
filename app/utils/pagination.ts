const LEFT_PAGE: 'LEFT' = 'LEFT' as const
const RIGHT_PAGE: 'RIGHT' = 'RIGHT' as const

export type PageType = number | 'LEFT' | 'RIGHT'

function range(from: number, to: number): number[] {
  return [...Array(to - from + 1)].map((_, index) => from + index)
}

export function generatePages(
  currentPage: number,
  totalPage: number
): PageType[] {
  if (totalPage <= 9) {
    return range(1, totalPage)
  }

  const START_PAGE = 1

  let middlePages: PageType[] = []
  const middlePageFrom = Math.max(START_PAGE + 2, currentPage - 1)
  const middlePageTo = Math.min(totalPage - 2, currentPage + 1)

  if (middlePageFrom === START_PAGE + 2) {
    middlePages = [...range(middlePageFrom, middlePageFrom + 3), RIGHT_PAGE]
  } else if (middlePageTo >= totalPage - 2) {
    middlePages = [LEFT_PAGE, ...range(middlePageTo - 3, middlePageTo)]
  } else {
    middlePages = [
      LEFT_PAGE,
      ...range(currentPage - 1, currentPage + 1),
      RIGHT_PAGE,
    ]
  }

  return [
    ...range(START_PAGE, START_PAGE + 1),
    ...middlePages,
    ...range(totalPage - 1, totalPage),
  ]
}
