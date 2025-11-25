// src/router/index.jsx
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import AnalysisPage from "../pages/AnalysisPage";
import ChehreOstaniPage from "../pages/ChehreOstaniPage";
import DetailsChehrePage from "../pages/DetailsChehrePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App ,
    children: [
      { index: true, Component: MainPage },
      { path: "analysis", Component: AnalysisPage },
      {
        path: "chehreostani",
        Component: ChehreOstaniPage ,
        children: [
          {
            path: "chehreDetails",
            Component: DetailsChehrePage ,
          },
        ],
      },
    ],
  },
  { path: "/login", Component: LoginPage },
]);
