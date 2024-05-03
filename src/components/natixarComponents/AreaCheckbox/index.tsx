import { Box } from "@mui/material"
import { CheckboxItem } from "./CheckboxItem"

export const AreaCheckbox = () => (
  <>
    <CheckboxItem label="France" />
    <CheckboxItem label="Italy">
      <Box sx={{ display: "flex", height: "100%" }}>
        <Box
          sx={{
            width: "1px",
            backgroundColor: "rgba(231,231,231,0.58)",
            marginLeft: "23.5px",
          }}
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CheckboxItem label="Milano" />
        </Box>
      </Box>
    </CheckboxItem>
    <CheckboxItem label="Germany">
      <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
        <CheckboxItem label="Berlin" />
        <CheckboxItem label="Bremen" />
        <CheckboxItem label="Bavaria" />
      </Box>
    </CheckboxItem>
  </>
)
