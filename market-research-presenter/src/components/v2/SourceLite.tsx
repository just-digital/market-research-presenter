import { useState } from "react";
import { Box, Chip, Typography, Link as MuiLink, Modal } from "@mui/material";
import { apiFetch } from "../../http";

import SourceFull from "./SourceFull";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 1,
};

const SourceLite = ({ source }: { source: any }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [sourceFull, setSourceFull] = useState(null);

  const handleTitleClick = async (sourceId: string) => {
    const response = await apiFetch(`/sources/${sourceId}`);
    // If the status is not 200, throw an error
    if (response.status !== 200) {
      throw new Error("Source not found - is your configured API URL correct?");
    }
    const sourceFull = await response.json();
    setSourceFull(sourceFull);
    setOpen(true);
  };

  return (
    <>
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
                onClick={(e) => {
                  e.preventDefault();
                  handleTitleClick(source.id);
                }}
                sx={{ textDecoration: "none", fontWeight: "bold" }}
              >
                {source.title}
              </MuiLink>
            </Typography>
            <Chip
              key={source.id}
              size="small"
              label={source.source_label}
              title={`The '${source.from_search}' keyword phrase led to a search result from ${source.source_label}`}
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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <SourceFull source={sourceFull} />
        </Box>
      </Modal>
    </>
  );
};

export default SourceLite;
