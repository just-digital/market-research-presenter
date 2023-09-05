import { useState } from "react";
import { Box, Typography, Stack, TextField, Button } from "@mui/material";
import useLocalStorage from "use-local-storage";

export default function Configure() {
  const [url, setUrl] = useLocalStorage("url", "");
  const [apiKey, setApiKey] = useLocalStorage("apiKey", "");
  const [saveDisabled, setSaveDisabled] = useState(false);

  const handleSave = () => {
    setSaveDisabled(true);
  };

  return (
    <Box component="form" width={600}>
      <Typography variant="h5" marginBottom={2}>
        Configuration
      </Typography>
      <Typography marginBottom={2}>
        Enter the URL of the API you wish to connect to.
      </Typography>
      <Stack>
        <TextField
          id="url"
          label="API URL"
          variant="outlined"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          size="small"
          fullWidth
          sx={{ marginBottom: "10px" }}
        />
        <TextField
          id="api_key"
          label="Key"
          variant="outlined"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          required
          size="small"
          fullWidth
          type="password"
          sx={{ marginBottom: "10px" }}
        />
      </Stack>
      <Button variant="outlined" onClick={handleSave} disabled={saveDisabled} sx={{marginRight:2}}>
        Save
      </Button>
      {saveDisabled && (
        <Button variant="outlined" onClick={() => window.location.reload()}>
          Refresh
        </Button>
      )}
    </Box>
  );
}
