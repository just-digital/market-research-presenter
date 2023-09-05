import { useLoaderData } from "react-router-dom";
import ReportV2 from "./v2/Report";

import { apiFetch } from "../http";

export async function loader({ params }: { params: any }) {
  // fetch the report from URL

  const reportId = params.reportId;
  const report = await apiFetch(`/reports/${reportId}`);
  // If the status is not 200, throw an error
  if (report.status !== 200) {
    throw new Error("Report not found - is your configured API URL correct?");
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
