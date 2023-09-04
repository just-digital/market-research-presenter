import { useLoaderData } from "react-router-dom";
import ReportV2 from "./v2/Report";

const API_BASE = "http://127.0.0.1:8004";
const API_KEY = "Xoong9eis5Uageiba6ie";

export async function loader({ params }: { params: any }) {
  // fetch the report from URL
  const reportId = params.reportId;
  const report = await fetch(`${API_BASE}/reports/${reportId}`, {
    headers: { access_token: API_KEY },
  });
  // If the status is not 200, throw an error
  if (report.status !== 200) {
    throw new Error("Report not found");
  }
  const reportData = await report.json();
  return reportData;
}

export default function Report() {
  const report: any = useLoaderData();
  const version = report.doc.version || "v0";

  if (version === "v2") {
    return <ReportV2 report={report} />;
  }
  return <div>Unknown version of report: {report.date}</div>;
}
