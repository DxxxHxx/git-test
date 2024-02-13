import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import GetUserInfo from "./components/GetUserInfo";
import Notfound from "./components/Notfound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Notfound />,
    children: [
      {
        path: "get-user-info",
        element: <GetUserInfo />,
      },
    ],
  },
]);
