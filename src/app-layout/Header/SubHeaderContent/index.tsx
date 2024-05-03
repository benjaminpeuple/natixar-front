// material-ui
import { Theme } from "@mui/material/styles"
import { Box, useMediaQuery } from "@mui/material"

// project import
import useConfig from "hooks/useConfig"
import { MenuOrientation } from "types/config"
import DrawerHeader from "../../Drawer/DrawerHeader"

import EmissionFilterMenu from "./EmissionFilterMenu"
import EmissionRequestParamsMenu from "./EmissionRequestParamsMenu"

// ==============================|| HEADER - CONTENT ||============================== //

const SubHeaderContent = () => {
  const { menuOrientation } = useConfig()

  const downLG = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"))

  return (
    <>
      {menuOrientation === MenuOrientation.HORIZONTAL && !downLG && (
        <DrawerHeader open />
      )}
      {!downLG && <EmissionFilterMenu />}
      {downLG && <Box sx={{ width: "100%", ml: 1 }} />}
      {!downLG && <EmissionRequestParamsMenu />}
    </>
  )
}

export default SubHeaderContent
