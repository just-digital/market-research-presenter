import { Box, Typography, Link } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
      <Typography
        variant="body2"
        align="center"
        color="text.secondary"
        component="p"
      >
        &copy; Copyright 2023.{" "}
        <Link href="https://rubiconcarbon.com/">Rubicon Carbon</Link>.
      </Typography>
    </Box>
  );
}
