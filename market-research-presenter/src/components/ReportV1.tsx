// @ts-nocheck
import { useState } from "react";

import { useTheme } from "@mui/material/styles";
import {
  Button,
  Box,
  Collapse,
  Link as MuiLink,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
  Modal,
  Chip,
  Stack,
} from "@mui/material";
import ReactMarkdown from "react-markdown";

import SentimentScale from "./SentimentScale";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DescriptionIcon from "@mui/icons-material/Description";

const Summary = ({ summaries }: any) => {
  // split the summary lines bullets

  return (
    <>
      {summaries.map((summary: any, idx: number) => {
        // Skip over the first because we've used it as the summary
        if (idx > 0) {
          return (
            <Typography key={idx} variant="" color="text.secondary">
              {summary.summary}
            </Typography>
          );
        } else {
          return null;
        }
      })}
    </>
  );
};

const Source = ({ source, setOpenModal, setCurrentArticle }: any) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const CATEGORIES = {
    category_n1: { title: "Market News", color: theme.extra.col5 },
    category_s1: { title: "Supply", color: theme.extra.col3 },
    category_d1: { title: "Demand", color: theme.extra.col4 },
    category_o1: { title: "Other", color: theme.extra.col5 },
  };

  return (
    <>
      <TableRow sx={{ borderBottom: "unset" }}>
        <TableCell sx={{ borderBottom: "unset" }}>
          <Stack direction="row" spacing={1} marginBottom={1}>
            {source.source && (
              <Chip
                key="source"
                size="small"
                label={source.source}
                variant="outlined"
              />
            )}
            {source.classifications &&
              source.classifications.map((classification: any, idx: number) => {
                return (
                  <Chip
                    size="small"
                    key={idx}
                    label={CATEGORIES[classification.category].title}
                    color="primary"
                    variant="outlined"
                    sx={{
                      color: CATEGORIES[classification.category].color,
                      borderColor: CATEGORIES[classification.category].color,
                    }}
                  />
                );
              })}

            <SentimentScale
              height={6}
              width={80}
              value={source.sentiment_score}
            />
          </Stack>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ fontSize: "0.975rem" }}
          >
            <MuiLink
              href="#"
              textDecoration="none"
              sx={{ textDecoration: "none", fontWeight: "bold" }}
              onClick={(e) => {
                e.preventDefault();
                setOpen(!open);
              }}
            >
              {source.title}
            </MuiLink>
          </Typography>
          <Typography variant="" color="text.secondary">
            {source.summaries && source.summaries[0].summary}
          </Typography>
        </TableCell>

        <TableCell sx={{ borderBottom: "unset" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>

      {/* <Summary> */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Summary summaries={source.summaries} />
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
                title="View scraped content from original article"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentArticle(source.content);
                  setOpenModal(true);
                }}
                sx={{ fontSize: "12px" }}
                size="small"
                variant=""
                color="secondary"
                startIcon={<DescriptionIcon />}
              >
                Scraped Content
              </Button>

              <Button
                LinkComponent={MuiLink}
                href={source.link}
                target="_blank"
                title="Link to original article"
                sx={{ fontSize: "12px" }}
                size="small"
                variant=""
                color="secondary"
                startIcon={<DescriptionIcon />}
              >
                Original Article
              </Button>
            </Box>
          </Collapse>
        </TableCell>
        <TableCell></TableCell>
      </TableRow>
    </>
  );
};

export default function ReportV1({ report }: { report: any }) {
  const [openModal, setOpenModal] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);

  console.log(report);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "80%",
    width: 800,
    bgcolor: "background.paper",
    border: "1px solid #cccccc",
    boxShadow: 24,
    p: 4,
    overflowY: "scroll",
    img: {
      maxWidth: "100%",
      display: "block",
      marginBottom: "10px",
    },
  };

  return (
    <>
      <Typography variant="h3" color="inherit" noWrap>
        Market Report for {report.end_date}
      </Typography>

      <Table sx={{ minWidth: 650 }}>
        <TableBody>
          {report.sources.map((source: any, idx: number) => (
            <Source
              key={idx}
              source={source}
              setOpenModal={setOpenModal}
              setCurrentArticle={setCurrentArticle}
            />
          ))}
        </TableBody>
      </Table>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Scraped Content from Original Article
          </Typography>
          <ReactMarkdown>{currentArticle}</ReactMarkdown>
        </Box>
      </Modal>
    </>
  );
}
