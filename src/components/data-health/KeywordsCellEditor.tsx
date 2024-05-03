import Popover from "@mui/material/Popover"
import Button from "@mui/material/Button"
import { ReactNode, useState } from "react"
import { SxProps } from "@mui/system"
import { Box } from "@mui/material"

interface KeywordsCellEditorProps {
  children: ReactNode
  buttonText: string
}

const KeywordsCellEditor = (props: KeywordsCellEditorProps & SxProps) => {
  const { children, buttonText, ...sxProps } = props
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? "keywordsCellEditor" : undefined

  return (
    <Box sx={{ ...sxProps }}>
      <Button
        aria-describedby={id}
        sx={{
          color: "primary.contrastText",
        }}
        variant="contained"
        onClick={handleClick}
      >
        {buttonText}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {children}
      </Popover>
    </Box>
  )
}

export default KeywordsCellEditor
