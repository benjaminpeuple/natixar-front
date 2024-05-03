// material-ui
import { Stack } from "@mui/material"

// project-import
import CircularWithPath from "./@extended/progress/CircularWithPath"

// ==============================|| LOADER - CIRCULAR ||============================== //

const CircularLoader = () => (
  <Stack alignItems="center" justifyContent="center" sx={{ height: "100%" }}>
    <CircularWithPath />
  </Stack>
)

export default CircularLoader
