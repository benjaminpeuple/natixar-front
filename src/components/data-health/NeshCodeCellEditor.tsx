import { TextField } from "@mui/material"
import { GridRenderEditCellParams, useGridApiContext } from "@mui/x-data-grid"
import { memo, useLayoutEffect, useRef } from "react"

const NeshCodeCellEditor = ({
  id,
  value,
  field,
  hasFocus,
}: GridRenderEditCellParams) => {
  const apiRef = useGridApiContext()
  const ref = useRef<HTMLInputElement>(null)

  useLayoutEffect(() => {
    if (hasFocus) {
      ref.current?.focus()
    }
  }, [hasFocus])

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value // The new value entered by the user
    apiRef.current.setEditCellValue({ id, field, value: newValue })
  }

  return (
    <TextField
      ref={ref}
      sx={{
        mr: ".5rem",
      }}
      variant="outlined"
      value={value}
      onChange={handleValueChange}
    />
  )
}

export default memo(NeshCodeCellEditor)
