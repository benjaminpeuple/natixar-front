import { memo, useState } from "react"
import { Box, Button, Paper, Stack, SxProps, Typography } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { formatEmissionAmount } from "data/domain/transformers/EmissionTransformers"
import useAsyncWork from "hooks/useAsyncWork"
import { EmissionDataPoint } from "data/domain/types/emissions/EmissionTypes"
import EmissionsByClusterTable from "./EmissionsTable"

export interface EmissionsByClusterProps {
  cluster: EmissionDataPoint[]
  onClose?: Function
}

const EmissionsByClusterSection = ({
  cluster,
  onClose,
  ...sxProps
}: EmissionsByClusterProps & SxProps) => {
  const [totalEmission, setTotalEmission] = useState("")
  useAsyncWork(
    () => {
      const totalAmount = cluster.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.totalEmissionAmount,
        0,
      )
      return formatEmissionAmount(totalAmount)
    },
    setTotalEmission,
    [cluster, formatEmissionAmount],
  )

  return (
    <Paper
      sx={{
        width: "100%",
        height: "100%",
        ...sxProps,
      }}
    >
      <Stack
        direction="column"
        sx={{
          width: "100%",
          height: "100%",
          px: "24px",
          py: "26px",
          gap: "20px",
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Button
            sx={{
              height: "40px",
              px: "16px",
              py: "9px",
              color: "primary.contrastText",
            }}
            onClick={() => onClose && onClose()}
            variant="contained"
          >
            <ArrowBackIcon />{" "}
            <Typography ml="8px" noWrap>
              Back to map
            </Typography>
          </Button>
          <Typography variant="h3" noWrap gutterBottom>
            TOTAL: {totalEmission}
          </Typography>
        </Stack>
        <Box sx={{ width: "100%", flex: 1 }}>
          <EmissionsByClusterTable cluster={cluster} />
        </Box>
      </Stack>
    </Paper>
  )
}

export default memo(EmissionsByClusterSection)
