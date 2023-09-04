import { AppBar, Typography, Toolbar, Link } from "@mui/material";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

export default function Header() {
  return (
    <AppBar position="relative" color="default">
      <Toolbar>
        <QueryStatsIcon sx={{ mr: 2 }} />
        <Typography variant="h6" color="inherit" noWrap>
          <Link
            color={"inherit"}
            underline={"none"}
            href="/market-research-presenter/"
          >
            Market Research
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
