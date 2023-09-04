import { Typography, Link as MuiLink } from "@mui/material";

const SourceTitle = ({
  title,
  handleTitleClick,
}: {
  title: string;
  handleTitleClick: any;
}) => {
  return (
    <Typography
      variant="h6"
      color="text.secondary"
      sx={{ fontSize: "0.975rem" }}
    >
      <MuiLink
        href="#"
        sx={{ textDecoration: "none", fontWeight: "bold" }}
        onClick={handleTitleClick}
      >
        {title}
      </MuiLink>
    </Typography>
  );
};

export default SourceTitle;