import { Chip, Stack } from "@mui/material";

const SourceTags = ({
  tags,
}: {
  tags: { key: string; label: string; reason: string; color: string }[];
}) => {
  if (!tags || tags.length == 0) return null;
  return (
    <>
      {tags.map((tag) => (
        <Chip
          key={tag.key}
          size="small"
          label={tag.label}
          title={tag.reason}
          variant="outlined"
          sx={{
            color: tag.color,
            borderColor: tag.color,
          }}
        />
      ))}
    </>
  );
};

export default SourceTags;
