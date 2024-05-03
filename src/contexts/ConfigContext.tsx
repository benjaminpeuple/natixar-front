import { createContext, ReactNode } from "react"

// project import
import useLocalStorage from "hooks/useLocalStorage"

// types
import {
  CustomizationProps,
  FontFamily,
  I18n,
  MenuOrientation,
  ThemeDirection,
} from "types/config"
import configNatixar from "config"

// initial state
const initialState: CustomizationProps = {
  ...configNatixar,
  onChangeContainer: () => {},
  onChangeLocalization: () => {},
  onChangeMode: () => {},
  onChangePresetColor: () => {},
  onChangeDirection: () => {},
  onChangeMiniDrawer: () => {},
  onChangeMenuOrientation: () => {},
  onChangeFontFamily: () => {},
  setIsShowExtraHeader: () => {},
}

// ==============================|| CONFIG CONTEXT & PROVIDER ||============================== //

const ConfigContext = createContext(initialState)

type ConfigProviderProps = {
  children: ReactNode
}

function ConfigProvider({ children }: ConfigProviderProps) {
  const [config, setConfig] = useLocalStorage(
    "mantis-react-ts-config",
    initialState,
  )

  const onChangeContainer = () => {
    setConfig({
      ...config,
      container: !config.container,
    })
  }

  const onChangeLocalization = (lang: I18n) => {
    setConfig({
      ...config,
      i18n: lang,
    })
  }

  const onChangeDirection = (direction: ThemeDirection) => {
    setConfig({
      ...config,
      themeDirection: direction,
    })
  }

  const onChangeMiniDrawer = (miniDrawer: boolean) => {
    setConfig({
      ...config,
      miniDrawer,
    })
  }

  const onChangeMenuOrientation = (layout: MenuOrientation) => {
    setConfig({
      ...config,
      menuOrientation: layout,
    })
  }

  const onChangeFontFamily = (fontFamily: FontFamily) => {
    setConfig({
      ...config,
      fontFamily,
    })
  }

  const setIsShowExtraHeader = (isShow: boolean) => {
    setConfig({
      ...config,
      isShowExtraHeader: isShow,
    })
  }

  return (
    <ConfigContext.Provider
      value={{
        ...config,
        onChangeContainer,
        onChangeLocalization,
        onChangeDirection,
        onChangeMiniDrawer,
        onChangeMenuOrientation,
        onChangeFontFamily,
        setIsShowExtraHeader,
      }}
    >
      {children}
    </ConfigContext.Provider>
  )
}

export { ConfigProvider, ConfigContext }
