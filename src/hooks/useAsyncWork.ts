import { useEffect } from "react"

export default function useAsyncWork<T>(
  work: () => T,
  resultAcceptor: (result: T) => any,
  deps: React.DependencyList = [],
) {
  useEffect(() => {
    let acceptResult = true
    const runAsyncWork = async () => {
      const result = work()
      if (acceptResult) {
        resultAcceptor(result)
      }
    }

    runAsyncWork()
    return () => {
      acceptResult = false
    }
  }, deps)
}
