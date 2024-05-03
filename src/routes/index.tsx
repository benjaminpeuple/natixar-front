import { createBrowserRouter } from "react-router-dom"
// project import
import MainRoutes from "./MainRoutes"
import LoginRoutes from "./LoginRoutes"

import AppLayout from "../app-layout"

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [MainRoutes],
  },
  LoginRoutes,
])

export default router
