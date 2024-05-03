import { Chip, Stack } from "@mui/material"
import { GridRenderCellParams } from "@mui/x-data-grid"

const KeywordsWidget = (props: GridRenderCellParams) => {
  const { value } = props
  const keywords = value as string[]
  if (keywords == null || keywords.length === 0) {
    return null
  }
  return (
    <Stack
      direction="row"
      gap={1}
      overflow="hidden"
      sx={{
        width: "100%",
        p: 1,
        m: 0,
      }}
    >
      {keywords.map((keyword) => (
        <Chip color="success" key={keyword} label={keyword} />
      ))}
    </Stack>
  )
}

export default KeywordsWidget
