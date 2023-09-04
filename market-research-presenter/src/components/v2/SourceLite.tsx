import { Box, Chip, Typography, Link as MuiLink } from "@mui/material";

const SourceLite = ({ source }: { source: any }) => {
  return (
    <ul style={{ paddingLeft: "20px", marginTop: "0", marginBottom: "0" }}>
      <li>
        <Box style={{ display: "flex" }}>
          <Typography
            noWrap
            color="text.secondary"
            sx={{ fontSize: "0.775rem" }}
          >
            <MuiLink
              title={source.title}
              target="_blank"
              href={source.url}
              sx={{ textDecoration: "none", fontWeight: "bold" }}
            >
              {source.title}
            </MuiLink>
          </Typography>
          <Chip
            key={source.id}
            size="small"
            label={source.source_label}
            title={`TODO: Add reason for ${source.id}`}
            variant="outlined"
            sx={{
              marginLeft: "10px",
              height: "15px",
              fontSize: "0.675rem",
              color: "inherit",
              borderColor: "inherit",
            }}
          />
        </Box>
      </li>
    </ul>
  );
};

export default SourceLite;
