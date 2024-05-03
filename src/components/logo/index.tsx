import { Link } from "react-router-dom"
import { To } from "history"

// material-ui
import { ButtonBase } from "@mui/material"
import { SxProps } from "@mui/system"

// project import
import { APP_DEFAULT_PATH } from "config"
import { useFusionAuth } from "@fusionauth/react-sdk"
import Logo from "./LogoMain"
import LogoIcon from "./LogoIcon"

// ==============================|| MAIN LOGO ||============================== //

interface Props {
  reverse?: boolean
  isIcon?: boolean
  sx?: SxProps
  to?: To
}

const LogoSection = ({ isIcon, sx, to }: Props) => {
  const { isAuthenticated } = useFusionAuth()

  return (
    <ButtonBase
      disableRipple
      {...(isAuthenticated && {
        component: Link,
        to: !to ? APP_DEFAULT_PATH : to,
        sx,
      })}
    >
      {isIcon ? <LogoIcon /> : <Logo />}
    </ButtonBase>
  )
}

export default LogoSection
