import { Typography } from "@mui/material";

const SourceDescription = ({ summaries }: { summaries?: any[] }) => {
  // Take the first N summary in the list as the "description" until it's large enough.
  const size = 200;

  // build a description or 2 or 3 summaries as long as they're less than 3000 chars
  if (summaries === undefined || summaries === null || summaries.length === 0) {
    return (
      <Typography color="text.secondary">No description available.</Typography>
    );
  }

  let description = "";
  let i = 0;
  while (i < summaries.length && description.length <= size) {
    description += summaries[i].summary;
    i++;
  }

  return <Typography color="text.secondary">{description}</Typography>;
};

export default SourceDescription;
