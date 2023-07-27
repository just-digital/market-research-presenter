// @ts-nocheck
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import {
  Box,
  Collapse,
  Link as MuiLink,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Modal,
  Chip,
} from "@mui/material";
import ReactMarkdown from "react-markdown";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DescriptionIcon from "@mui/icons-material/Description";

// Regroup the source articles by classification
function reClassify(report: any) {
  const groups = {
    CategoryN1: {
      name: "Market News",
      sources: [],
    },
    CategoryS1: {
      name: "Supply",
      sources: [],
    },
    CategoryD1: {
      name: "Demand",
      sources: [],
    },
    CategoryO1: {
      name: "Other",
      sources: [],
    },
  };

  report.sources.forEach((group: any) => {
    group.forEach((source: any) => {
      const classification: string = source.classification.category;
      if (classification in groups) {
        groups[classification].sources.push(source);
      } else {
        groups[classification] = {
          name: source.classification,
          sources: [source],
        };
      }
    });
  });

  report.sections = groups;
  return report;
}

export async function loader({ params }: { params: any }) {
  // fetch the report from URL
  const reportId = params.reportId;
  const report = await fetch(
    `https://raw.githubusercontent.com/just-digital/market-research-presenter/main/market-research-presenter/public/reports/${reportId}.json`
  );
  // If the status is not 200, throw an error
  if (report.status !== 200) {
    throw new Error("Report not found");
  }
  const reportData = await report.json();
  return reClassify(reportData);
}

const Section = ({ title, sources, setCurrentArticle, setOpenModal }: any) => {
  return (
    <>
      <Typography variant="h4" marginTop={2}>
        {title}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>Title</TableCell>
            <TableCell>Sentiment</TableCell>
            <TableCell>Article</TableCell>
            <TableCell>Source</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sources.map((source: any, idx: number) => (
            <Source
              source={source}
              setCurrentArticle={setCurrentArticle}
              setOpenModal={setOpenModal}
            />
          ))}
        </TableBody>
      </Table>
    </>
  );
};

const Summary = ({ summary }: any) => {
  // split the summary lines bullets
  const lines = summary.split("\n");
  return (
    <ul>
      {lines.map((line: string, idx: number) => (
        <li>{line.replace("-", "")}</li>
      ))}
    </ul>
  );
};

const Source = ({ source, setOpenModal, setCurrentArticle }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ borderBottom: "unset" }}>
        <TableCell sx={{ borderBottom: "unset" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell sx={{ borderBottom: "unset" }}>
          <MuiLink
            href="#"
            textDecoration="none"
            sx={{ textDecoration: "none" }}
            onClick={(e) => {
              e.preventDefault();
              setOpen(!open);
            }}
          >
            {source.title}
          </MuiLink>
        </TableCell>
        <TableCell sx={{ borderBottom: "unset" }}>
          <Box component="span">{source.sentiment.reason}</Box>
          <Chip size="small" label={source.sentiment.score} />
        </TableCell>
        <TableCell sx={{ borderBottom: "unset" }}>
          <MuiLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentArticle(source.content);
              setOpenModal(true);
            }}
          >
            <DescriptionIcon color="disabled" />
          </MuiLink>
        </TableCell>
        <TableCell sx={{ borderBottom: "unset" }}>
          <MuiLink href={source.link} target="_blank">
            {source.source}
          </MuiLink>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 0 }}>
              <Typography variant="body1" gutterBottom component="div">
                Summary
              </Typography>
              <Summary summary={source.summary} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default function Report() {
  const report: any = useLoaderData();

  const [openModal, setOpenModal] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: '80%',
    width: 800,
    bgcolor: "background.paper",
    border: "1px solid #cccccc",
    boxShadow: 24,
    p: 4,
    overflowY: "scroll",
  };

  return (
    <>
      <Typography variant="h3" color="inherit" noWrap>
        Market Report for {report.date}
      </Typography>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Scraped Content from Original Article
          </Typography>
          <ReactMarkdown>{currentArticle}</ReactMarkdown>
        </Box>
      </Modal>

      {Object.keys(report.sections).map((gid: any) => (
        <Section
          key={gid}
          title={report.sections[gid].name}
          sources={report.sections[gid].sources}
          setCurrentArticle={setCurrentArticle}
          setOpenModal={setOpenModal}
        />
      ))}
    </>
  );
}
