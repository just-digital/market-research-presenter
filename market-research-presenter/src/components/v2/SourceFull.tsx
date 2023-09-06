import { useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Stack,
  Link as MuiLink,
  IconButton,
  Collapse,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import SourceTitle from "./SourceTitle";
import SourceTags from "./SourceTags";
import SourceSummary from "./SourceSummary";
import SourceDescription from "./SourceDescription";
import SourceButtons from "./SourceButtons";
import SentimentScale from "./SentimentScale";

const transformTags = (source: any, theme: any) => {
  const CATEGORIES = {
    category_n1: { title: "Market News", color: theme.extra.col6 },
    category_s1: { title: "Supply", color: theme.extra.col3 },
    category_d1: { title: "Demand", color: theme.extra.col4 },
    category_o1: { title: "Other", color: theme.extra.col5 },
  };
  let all_tags = [];

  // first, grab the source label as a tag.
  if (source.source_label) {
    let reason = `An article from ${source.source_label}`;
    if (source.from_search) {
      reason = `The '${source.from_search}' keyword phrase led to a search result from ${source.source_label}`;
    }
    all_tags.push({
      key: "source_label",
      label: source.source_label,
      reason: reason,
      color: "inherit",
    });
  }

  try {
    let tags = source.analysis.classifications;
    tags.map(
      (classification: { category: string; reason: string }, idx: number) => {
        all_tags.push({
          key: idx,
          label:
            CATEGORIES[classification.category as keyof typeof CATEGORIES]
              .title,
          color:
            CATEGORIES[classification.category as keyof typeof CATEGORIES]
              .color,
          reason: classification.reason,
        });
      }
    );
  } catch (error) {
    return all_tags;
  }
  return all_tags;
};

const SourceFull = ({ source }: { source: any }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleTitleClick = (e: any) => {
    e.preventDefault();
    setOpen(!open);
  };

  return (
    <>
      <Table sx={{ minWidth: 650 }}>
        <TableBody>
          <TableRow sx={{ borderBottom: "unset" }}>
            <TableCell sx={{ borderBottom: "unset" }}>
              <Stack direction="row" spacing={1} marginBottom={1}>
                <SourceTags tags={transformTags(source, theme)} />

                <SentimentScale
                  height={6}
                  width={80}
                  value={source.analysis.sentiment_score}
                />
              </Stack>

              <SourceTitle
                title={source.title}
                handleTitleClick={handleTitleClick}
              />
              <SourceDescription summaries={source.analysis.summaries} />
            </TableCell>

            <TableCell sx={{ borderBottom: "unset" }} width={20}>
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
                <SourceSummary summaries={source.analysis.summaries} />
                <Stack direction="row" spacing={1} marginTop={2}>
                  <SourceButtons link={source.url} />
                  <Typography fontSize={10} paddingTop={1} >Rank score: {source.rank_score}</Typography>
                </Stack>
              </Collapse>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default SourceFull;
