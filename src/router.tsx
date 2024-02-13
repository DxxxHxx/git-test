import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import TodoList from "./components/TodoList";
import PostDetail from "./components/PostDetail";
import Login from "./components/Login";
import UserList from "./components/UserList";
import Prac from "./components/Prac";
import Notfound from "./components/Notfound";

export const router2 = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<TodoList />} />
      <Route path="/post-detail/:id" element={<PostDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user-list" element={<UserList />} />
      <Route path="/prac" element={<Prac />} />
    </Route>
  )
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Notfound />,
    children: [
      {
        path: "",
        element: <TodoList />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: `post-detail/:id`,
        element: <PostDetail />,
      },
    ],
  },
  {
    path: "/prac",
    element: <Prac />,
  },
]);
