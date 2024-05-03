import { ReactNode, useMemo } from "react"

// material-ui
import { CssBaseline, StyledEngineProvider } from "@mui/material"
import {
  createTheme,
  ThemeOptions,
  ThemeProvider,
  Theme,
} from "@mui/material/styles"

// project import
import Palette from "./palette"
import Typography from "./typography"
import CustomShadows from "./shadows"
import componentsOverride from "./overrides"

// types
type ThemeCustomizationProps = {
  children: ReactNode
}

// ==============================|| DEFAULT THEME - MAIN ||============================== //

export default function ThemeCustomization({
  children,
}: ThemeCustomizationProps) {
  // const { themeDirection } = useConfig();

  const themeCustomShadows = CustomShadows()
  const { palette } = Palette()

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      breakpoints: {
        values: {
          xs: 0,
          sm: 768,
          md: 1024,
          lg: 1266,
          xl: 1440,
        },
      },
      direction: "ltr",
      mixins: {
        toolbar: {
          minHeight: 60,
          paddingTop: 8,
          paddingBottom: 8,
        },
      },
      palette,
      customShadows: themeCustomShadows,
      typography: Typography,
    }),
    [palette, themeCustomShadows],
  )

  const themes: Theme = createTheme(themeOptions)
  themes.components = componentsOverride(themes)

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
