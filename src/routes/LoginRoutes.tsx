import { lazy } from "react"

// project import
import AuthLayout from "layout/Auth"
import Loadable from "components/Loadable"

// render - login
const AuthLogin = Loadable(lazy(() => import("pages/auth/login")))

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: "/authentication",
  element: <AuthLayout />,
  children: [
    {
      path: "login",
      element: <AuthLogin />,
    },
  ],
}

export default LoginRoutes
