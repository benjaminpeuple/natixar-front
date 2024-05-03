import { ReactNode } from "react"

// material-ui
import { CacheProvider } from "@emotion/react"
import createCache from "@emotion/cache"

// ==============================|| RTL LAYOUT ||============================== //

interface Props {
  children: ReactNode
}

const RTLLayout = ({ children }: Props) => {
  const cacheRtl = createCache({
    key: "css",
    prepend: true,
    stylisPlugins: [],
  })

  return <CacheProvider value={cacheRtl}>{children}</CacheProvider>
}

export default RTLLayout
