// material-ui
import { styled } from "@mui/material/styles"

// third-party
import { SnackbarProvider } from "notistack"

// project import
import Loader from "components/Loader"

// assets
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons"

// custom styles
const StyledSnackbarProvider = styled(SnackbarProvider)(({ theme }) => ({
  "&.notistack-MuiContent-default": {
    backgroundColor: theme.palette.primary.main,
  },
  "&.notistack-MuiContent-error": {
    backgroundColor: theme.palette.error.main,
  },
  "&.notistack-MuiContent-success": {
    backgroundColor: theme.palette.success.main,
  },
  "&.notistack-MuiContent-info": {
    backgroundColor: theme.palette.info.main,
  },
  "&.notistack-MuiContent-warning": {
    backgroundColor: theme.palette.warning.main,
  },
}))

// ===========================|| SNACKBAR - NOTISTACK ||=========================== //

const Notistack = ({ children }: any) => {
  const iconSX = { marginRight: 8, fontSize: "1.15rem" }

  return { children }
}

export default Notistack
