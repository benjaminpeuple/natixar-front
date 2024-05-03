import { lazy } from "react"

// project import
import Loadable from "components/Loadable"
import PagesLayout from "layout/Pages"

// render - contributor
const ContributorAnalysis = Loadable(
  lazy(() => import("pages/contributor/ContributorAnalysis")),
)
const CategoryAnalysis = Loadable(
  lazy(() => import("pages/contributor/categoryanalysis")),
)
const DocumentUpload = Loadable(lazy(() => import("pages/contributor/upload")))

// render - widget
const ClimateChangeDashboard = Loadable(
  lazy(() => import("pages/natixar/ClimateChangePage")),
)
const TopContributorsPage = Loadable(
  lazy(() => import("pages/contributor/TopContributorsPage")),
)
const ScopePage = Loadable(lazy(() => import("pages/natixar/ScopePage")))
const ContributorsPage = Loadable(
  lazy(() => import("pages/natixar/ContributorsPage")),
)
const DataHealthPage = Loadable(lazy(() => import("pages/natixar/DataPage")))

// render - charts & map
const ContributorsDashboard = Loadable(lazy(() => import("pages/maps-leaflet")))

const MaintenanceError = Loadable(lazy(() => import("pages/maintenance/404")))
const MaintenanceError500 = Loadable(
  lazy(() => import("pages/maintenance/500")),
)
const MaintenanceUnderConstruction = Loadable(
  lazy(() => import("pages/maintenance/under-construction")),
)
const MaintenanceComingSoon = Loadable(
  lazy(() => import("pages/maintenance/coming-soon")),
)

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  children: [
    {
      index: true,
      element: <ClimateChangeDashboard />,
      errorElement: <MaintenanceError />,
    },
    {
      path: "contributors",
      children: [
        {
          path: "dashboard",
          element: <ContributorsDashboard />,
        },
        {
          path: "top/scope/:scopeId",
          element: <TopContributorsPage />,
        },
        {
          path: "scope/:id",
          element: <ScopePage />,
        },
        {
          path: "scope-details/:id",
          element: <ContributorsPage />,
        },
        {
          path: "category-analysis/:id",
          element: <CategoryAnalysis />,
        },
        {
          path: "analysis/:id",
          element: <ContributorAnalysis />,
        },
      ],
    },
    {
      path: "data",
      children: [
        {
          path: "health",
          element: <DataHealthPage />,
        },
      ],
    },
    {
      path: "upload",
      element: <DocumentUpload />,
    },
    {
      path: "lca",
      element: <MaintenanceUnderConstruction />,
    },
    {
      path: "settings",
      element: <MaintenanceUnderConstruction />,
    },
    {
      path: "/maintenance",
      element: <PagesLayout />,
      children: [
        {
          path: "404",
          element: <MaintenanceError />,
        },
        {
          path: "500",
          element: <MaintenanceError500 />,
        },
        {
          path: "under-construction",
          element: <MaintenanceUnderConstruction />,
        },
        {
          path: "coming-soon",
          element: <MaintenanceComingSoon />,
        },
      ],
    },
  ],
}

export default MainRoutes
