import { Typography } from "@mui/material";

const SourceSummary = ({ summaries }: { summaries?: any[] }) => {
  const size = 200;

  // ignore the description (2 or 3 summaries)
  if (summaries === undefined || summaries === null || summaries.length === 0) {
    return (
      <Typography color="text.secondary">No summaries available.</Typography>
    );
  }

  let descriptionLength = 0;
  let i = 0;
  while (i < summaries.length && descriptionLength <= size) {
    descriptionLength += summaries[i].summary.length;
    i++;
  }

  return (
    <>
      {summaries.slice(i).map((summary: any, idx: number) => {
        return (
          <Typography key={idx} color="text.secondary">
            {summary.summary}
          </Typography>
        );
      })}
    </>
  );
};

export default SourceSummary;
