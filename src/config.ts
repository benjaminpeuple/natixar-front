// types
import {
  DefaultConfigProps,
  MenuOrientation,
  ThemeDirection,
  ThemeMode,
} from "types/config"

// ==============================|| THEME CONSTANT ||============================== //

export const APP_DEFAULT_PATH = "/"
export const HORIZONTAL_MAX_ITEM = 7
export const DRAWER_WIDTH = 260
export const MINI_DRAWER_WIDTH = 60

// ==============================|| THEME CONFIG ||============================== //

const configNatixar: DefaultConfigProps = {
  fontFamily: `'Public Sans', sans-serif`,
  i18n: "en",
  menuOrientation: MenuOrientation.VERTICAL,
  miniDrawer: false,
  container: true,
  mode: ThemeMode.LIGHT,
  presetColor: "default",
  themeDirection: ThemeDirection.LTR,
  isShowExtraHeader: false,
}

export default configNatixar
