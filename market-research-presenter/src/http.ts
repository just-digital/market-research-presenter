
export const apiFetch = async (url: string) => {
  var apiBase: string | null;
  var apiKey: string | null;
  try {
    apiBase = localStorage.getItem("url");
    apiKey = localStorage.getItem("apiKey");
  } catch (error) {
    apiBase = null;
    apiKey = null;
  }

  if (!apiBase || apiBase === '""' || !apiKey || apiKey === '""') {
    throw new Error("Please configure the app first!");
  } else {
    apiBase = apiBase.replaceAll('"', "");
    apiKey = apiKey.replaceAll('"', "");
  }

  return fetch(`${apiBase}${url}`, {
    headers: new Headers({
      "ngrok-skip-browser-warning": "1",
      access_token: apiKey || "",
    }),
  });
}