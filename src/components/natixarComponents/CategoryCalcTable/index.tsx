// material-ui
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"

// ===========================|| DATA WIDGET - PROJECT TABLE CARD ||=========================== //
type CategoryCalcTableItemProps = {
  year: number
  methodology: string
  amount: number
}

type CategoryCalcTableProps = {
  data: CategoryCalcTableItemProps[]
}

export const CategoryCalcTable = ({ data }: CategoryCalcTableProps) => (
  <TableContainer>
    <Table>
      <TableHead
        sx={{
          border: "none",
          borderBottom: "1px solid",
          borderColor: "#e6ebf1",
        }}
      >
        <TableRow sx={{ height: "70px" }}>
          <TableCell
            sx={{ width: "300px", textTransform: "none" }}
            align="left"
          >
            <Typography variant="subtitle2">Year</Typography>
          </TableCell>
          <TableCell sx={{ width: "300px", textTransform: "none" }}>
            <Typography variant="subtitle2">Methodology</Typography>
          </TableCell>
          <TableCell sx={{ textTransform: "none" }}>
            <Typography variant="subtitle2">Scope 3 (t of CO2)</Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, index) => (
          <TableRow hover key={index} sx={{ height: "70px" }}>
            <TableCell align="left">{row.year}</TableCell>
            <TableCell align="left">{row.methodology}</TableCell>
            <TableCell align="left">{`${row.amount}k`}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)
