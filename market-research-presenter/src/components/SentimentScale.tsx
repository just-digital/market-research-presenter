// @ts-nocheck
import React from "react";
import { Box, Popper, Paper, Typography } from "@mui/material";

import { useTheme } from "@mui/material/styles";


const Popup = ({ open, anchorEl, value }) => {
  return (
    <Popper
      id={"id"}
      open={open}
      anchorEl={anchorEl}
      sx={{
        transformOrigin: "center -50px",
      }}
    >
      <Paper
        color="primary"
        sx={{ padding: "10px", transformOrigin: "center -50px" }}
      >
        <Typography sx={{ fontSize: "0.975rem" }}>
          {value && value.toFixed(2)}
        </Typography>
      </Paper>
    </Popper>
  );
};

export default function SentimentScale({ height, width, value }) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const xAxis = ((value + 1) / 2) * width; // normalized to 0..2 and also to width.
  const thumbSizeH = height * 2;
  const thumbSizeW = 2; //thumbSizeH / 5;
  const radius = height / 2;

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box>
      <Popup open={open} anchorEl={anchorEl} value={value} />
      <Box
        component={"div"}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        sx={{ height: height, width: width, marginTop: "10px" }}
      >
        <Box
          sx={{
            height: height,
            width: "50%",
            float: "left",
            backgroundColor: theme.extra.col7,
            borderTopLeftRadius: radius,
            borderBottomLeftRadius: radius,
          }}
        ></Box>
        <Box
          sx={{
            height: height,
            width: "50%",
            float: "left",
            backgroundColor: theme.palette.secondary.main,
            borderTopRightRadius: radius,
            borderBottomRightRadius: radius,
          }}
        >
          {" "}
        </Box>
        <Box
          sx={{
            position: "relative",
            height: thumbSizeH,
            width: thumbSizeW,
            left: xAxis - thumbSizeW / 2,
            top: (thumbSizeH / 4) * -1,
            backgroundColor: theme.palette.primary.main,
          }}
        >
          {" "}
        </Box>
      </Box>
    </Box>
  );
}
