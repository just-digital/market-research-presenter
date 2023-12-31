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
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import { LineChart } from "@mui/x-charts/LineChart";

const sentiment = [0.2, -0.2, 0.5, 0.7, -0.8, 0.9, 1];
const xLabels = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
const yLabels = [-1, -0.5, 0, 0.5, 1];

export function DashedLineChart() {
  return (
    <LineChart
      width={800}
      height={300}
      series={[{ data: sentiment, label: "Sentiment", id: "pvId" }]}
      xAxis={[{ scaleType: "point", data: xLabels }]}
      sx={{
        ".MuiLineElement-root, .MuiMarkElement-root": {
          strokeWidth: 1,
        },
        ".MuiLineElement-series-pvId": {
          strokeDasharray: "5 5",
        },
        "& .MuiMarkElement-highlighted": {
          stroke: "none",
        },
      }}
    />
  );
}

function createData(reportId: string, generated: boolean) {
  return { reportId, generated };
}

dayjs.extend(utc);
dayjs.extend(timezone);

const rows = Array.from({ length: 10 }, (_, i) => {
  const date = dayjs()
    .tz("America/Los_Angeles")
    .subtract(i, "day")
    .format("YYYY-MM-DD");
  return createData(date, true);
});

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
