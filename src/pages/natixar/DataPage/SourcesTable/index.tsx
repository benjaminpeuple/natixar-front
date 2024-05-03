import {
  Chip,
  ChipProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"

// project imports
import MainCard from "components/MainCard"
import { useState } from "react"

// table data
const createData = (badgeText: string, badgeType: ChipProps["color"]) => ({
  badgeText,
  badgeType,
})

const rows = [
  createData("Good", "success"),
  createData("Stale", "warning"),
  createData("Old", "error"),
]

const rows2 = [
  {
    id: 1,
    source: "Emissions factors",
    lastUpdate: "04.02.2024 15:06",
  },
  {
    id: 2,
    source: "Emissions factors",
    lastUpdate: "04.02.2024 15:06",
  },
  {
    id: 3,
    source: "Emissions factors",
    lastUpdate: "04.02.2024 15:06",
  },
]

const Row = ({
  row,
  rowsData,
}: {
  row: ReturnType<typeof createData>
  rowsData: { id: number; source: string; lastUpdate: string }[]
}) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    if (rowsData.length) {
      setOpen(!open)
    }
  }

  return (
    <>
      <TableRow
        hover
        onClick={handleOpen}
        sx={{ background: rowsData.length ? "#E6F7FF" : undefined }}
      >
        <TableCell sx={{ pr: 3 }}>
          <Chip color={row.badgeType} label={row.badgeText} size="small" />
          {"  "}({rowsData.length})
        </TableCell>
        <TableCell />
        <TableCell />
        <TableCell />
      </TableRow>
      {open &&
        rowsData.map((rowData) => (
          <TableRow key={rowData.id}>
            <TableCell sx={{ pr: 3 }} />
            <TableCell>{rowData.id}</TableCell>
            <TableCell>{rowData.source}</TableCell>
            <TableCell align="right">{rowData.lastUpdate}</TableCell>
          </TableRow>
        ))}
    </>
  )
}

const SourcesTable = ({ title }: { title: string }) => (
  <MainCard title={title} content={false}>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ pl: 3 }}>STATUS</TableCell>
            <TableCell>#</TableCell>
            <TableCell>SOURCE</TableCell>
            <TableCell align="right" sx={{ pr: 3 }}>
              LAST UPDATE
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <Row row={row} key={index} rowsData={rows2} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </MainCard>
)

export default SourcesTable
