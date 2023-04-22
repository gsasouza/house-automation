import * as React from 'react'
import { RouterProvider } from "react-router-dom";

import Auth from '../components/auth/Auth'
import Dashboard from "../components/dashboard/Dashboard";
import { createBrowserRouter} from "react-router-dom";
import RoomList from "../components/rooms/RoomList";
import BoardList from "../components/boards/BoardList";
import UserList from "../components/users/UserList";
import BoardIoList from "../components/boardIos/BoardIoList";
import Content from "../components/common/content/Content";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Auth/>,
    },
    {
      path: "dashboard",
      element: <Content />,
      children: [
        { path: '', element: <Dashboard />},
        { path: "rooms", element: <RoomList/> },
        { path: "boardIos", element: <BoardIoList/> },
        { path: "boards", element: <BoardList/> },
        { path: "users", element: <UserList/> },
      ]
    }
  ]
);


const AppRouter = () => (
  <RouterProvider router={router}/>
)

export default AppRouter
