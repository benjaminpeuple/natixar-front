import { useState } from "react"

// ==============================|| CARD - PAGINATION ||============================== //

export default function usePagination(data: any, itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const maxPage = Math.ceil(data.length / itemsPerPage)

  function currentData() {
    const begin = (currentPage - 1) * itemsPerPage
    const end = begin + itemsPerPage
    return data.slice(begin, end)
  }

  function next() {
    setCurrentPage((NewCurrentPage: number) =>
      Math.min(NewCurrentPage + 1, maxPage),
    )
  }

  function prev() {
    setCurrentPage((NewCurrentPage: number) => Math.max(NewCurrentPage - 1, 1))
  }

  function jump(page: number) {
    const pageNumber = Math.max(1, page)
    setCurrentPage(() => Math.min(pageNumber, maxPage))
  }

  return { next, prev, jump, currentData, currentPage, maxPage }
}
