import { Paper, Typography } from "@mui/material";
import { useRouteError } from "react-router-dom";

import Configure from "./components/Configure";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <Paper elevation={3} sx={{ p: 2, m: 2 }}>
      <h1>Oops!</h1>
      <Typography variant="body1" color="inherit" noWrap marginBottom={3}>
        <i>{error.statusText || error.message}</i>
      </Typography>

      <Configure />
    </Paper>
  );
}
