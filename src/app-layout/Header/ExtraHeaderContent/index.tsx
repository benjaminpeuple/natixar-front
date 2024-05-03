// material-ui
import { useTheme } from "@mui/material/styles"
import { Box, Button } from "@mui/material"
import { ArrowLeftOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"

// project import
import useConfig from "hooks/useConfig"

// ==============================|| HEADER - CONTENT ||============================== //

const ExtraHeaderContent = () => {
  const navigate = useNavigate()
  const { setIsShowExtraHeader } = useConfig()
  const theme = useTheme()

  const handleBack = () => {
    navigate(-1)
    setIsShowExtraHeader(false)
  }

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <Button onClick={handleBack} sx={{ color: `${theme.palette.grey[900]}` }}>
        <ArrowLeftOutlined />
        &nbsp;&nbsp;&nbsp; Back
      </Button>
    </Box>
  )
}

export default ExtraHeaderContent
