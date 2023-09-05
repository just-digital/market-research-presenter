import Header from "./components/Header";
import Footer from "./components/Footer";
import ReportSelector from "./components/ReportSelector";
import Report, { loader as reportLoader } from "./components/Report";
import Root from "./components/Root";
import ErrorPage from "./ErrorPage";
import Configure from "./components/Configure";

import { createHashRouter, RouterProvider } from "react-router-dom";

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <ReportSelector /> },
      {
        path: "configure",
        element: <Configure />,
      },
      {
        path: "reports/:reportId",
        element: <Report />,
        loader: reportLoader,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}

export default App;
