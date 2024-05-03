// material-ui
import { createTheme } from "@mui/material/styles"

// third-party
import { presetPalettes, PalettesProps } from "@ant-design/colors"

// types
import { PaletteThemeProps } from "types/theme"
import Default from "./theme/default"

// ==============================|| DEFAULT THEME - PALETTE ||============================== //

const Palette = () => {
  const colors: PalettesProps = presetPalettes

  const greyPrimary = [
    "#ffffff",
    "#fafafa",
    "#f5f5f5",
    "#f0f0f0",
    "#d9d9d9",
    "#bfbfbf",
    "#8c8c8c",
    "#595959",
    "#262626",
    "#141414",
    "#000000",
  ]
  const greyAscent = ["#fafafa", "#bfbfbf", "#434343", "#1f1f1f"]
  const greyConstant = ["#fafafb", "#e6ebf1"]

  colors.grey = [...greyPrimary, ...greyAscent, ...greyConstant]

  const paletteColor: PaletteThemeProps = Default(colors)

  return createTheme({
    palette: {
      common: {
        black: "#000",
        white: "#fff",
      },
      ...paletteColor,
      text: {
        primary: paletteColor.grey[700],
        secondary: paletteColor.grey[500],
        disabled: paletteColor.grey[400],
      },
      action: {
        disabled: paletteColor.grey[300],
      },
      divider: paletteColor.grey[200],
      background: {
        paper: paletteColor.grey[0],
        default: paletteColor.grey.A50,
      },
    },
  })
}

export default Palette
