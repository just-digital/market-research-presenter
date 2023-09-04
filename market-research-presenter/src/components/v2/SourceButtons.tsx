import { Box, Button, Link as MuiLink } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";

const SourceButtons = ({ link }: { link: string }) => {
  return (
    <Box
      marginTop={2}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "left",
        typography: "body1",
        "& > :not(style) ~ :not(style)": {
          ml: 2,
        },
      }}
    >
      <Button
        LinkComponent={MuiLink}
        href={link}
        target="_blank"
        title="Link to original article"
        sx={{ fontSize: "12px" }}
        size="small"
        startIcon={<DescriptionIcon />}
      >
        Original Article
      </Button>
    </Box>
  );
};

export default SourceButtons;
