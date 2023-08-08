import { useLoaderData } from "react-router-dom";
import ReportV0 from "./ReportV0";
import ReportV1 from "./ReportV1";

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
  return reportData;
}

export default function Report() {
  const report: any = useLoaderData();
  const version = report.version || "v0";

  if (version === "v0") {
    return <ReportV0 report={report} />;
  } else if (version === "v1") {
    return <ReportV1 report={report}/>;
  } else {
    return <div>Unknown version of report: {report.date}</div>;
  }
}
