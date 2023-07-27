import { Outlet } from "react-router-dom";
import { Paper } from "@mui/material";

export default function Root() {
  return (
    <Paper elevation={3} sx={{ p: 2, m: 2 }}>
      <Outlet />
    </Paper>
  );
}
