// material-ui
import { Stack, SxProps } from "@mui/material"

import {
  FusionAuthLoginButton,
  FusionAuthRegisterButton,
} from "@fusionauth/react-sdk"

const LoginButtons = ({ ...sxProps }: SxProps) => (
  <Stack sx={{ minWidth: "20rem", gap: ".5rem", ...sxProps }}>
    <FusionAuthLoginButton />
    <FusionAuthRegisterButton />
  </Stack>
)

export default LoginButtons
