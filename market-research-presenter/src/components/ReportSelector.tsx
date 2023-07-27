import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { Link } from "react-router-dom";

function createData(reportId: string, generated: boolean) {
  return { reportId, generated };
}

const rows = [
  createData("2023-07-24", false),
  createData("2023-07-25", false),
  createData("2023-07-26", true),
  createData("2023-07-27", true),
  createData("2023-07-28", true),
];

export default function ReportSelector() {
  return (
    <>
      <Typography variant="h6" color="inherit" noWrap>
        Report Selector
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Report</TableCell>
              <TableCell align="right">Generated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.reportId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.generated ? (
                    <Link
                      style={{ color: "#1976d2f0", textDecoration: "none" }}
                      to={`reports/${row.reportId}`}
                    >
                      {row.reportId}
                    </Link>
                  ) : (
                    <Typography variant="body2">{row.reportId}</Typography>
                  )}
                </TableCell>
                <TableCell align="right">
                  {row.generated ? <CheckIcon /> : ""}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
