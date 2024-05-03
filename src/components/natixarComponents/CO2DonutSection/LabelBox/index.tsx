import { Box, IconButton, Typography } from "@mui/material"
import { ArrowRightOutlined } from "@ant-design/icons"

import { useNavigate } from "react-router-dom"
import { LabelBoxProps } from "./interface"
import {
  ButtonContainerStyles,
  ContainerStyles,
  DotStyles,
  LabelValueStyles,
} from "./styled"

const LabelBox = ({ legend }: LabelBoxProps) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`${legend.navLink}`)
  }

  return (
    <Box sx={ContainerStyles(legend.color)} onClick={handleClick}>
      <Box sx={LabelValueStyles}>
        <Box sx={DotStyles(legend.color)} />
        <Typography variant="h6">{legend.title}</Typography>
      </Box>
      <Box sx={LabelValueStyles}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {legend.value}
        </Typography>
      </Box>
      <Box sx={ButtonContainerStyles}>
        <IconButton sx={{ borderRadius: "100%", background: "#E6F7FF" }}>
          <ArrowRightOutlined />
        </IconButton>
      </Box>
    </Box>
  )
}

export default LabelBox
