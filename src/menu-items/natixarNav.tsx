// third-party
import { FormattedMessage } from "react-intl"

// assets
import {
  IdcardOutlined,
  DashboardOutlined,
  SettingOutlined,
  CloudUploadOutlined,
  FileTextOutlined,
  DatabaseOutlined,
  PieChartOutlined,
} from "@ant-design/icons"

// type
import { NavItemType } from "types/menu"
import { LCAIcon } from "../assets/icons/LCAIcon"
import { MapIcon } from "../assets/icons/MapIcon"

// icons
const icons = {
  IdcardOutlined,
  DashboardOutlined,
  SettingOutlined,
  CloudUploadOutlined,
  FileTextOutlined,
  DatabaseOutlined,
  PieChartOutlined,
}

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const natixarNav: NavItemType[] = [
  {
    id: "contributor",
    icon: icons.IdcardOutlined,
    type: "group",
    children: [
      {
        id: "home-dashboard",
        title: <FormattedMessage id="Dashboard" />,
        type: "item",
        url: "/",
        icon: icons.PieChartOutlined,
      },
      {
        id: "contributors",
        title: <FormattedMessage id="Contributors" />,
        type: "item",
        url: "/contributors/dashboard",
        icon: MapIcon,
      },
      {
        id: "data-health",
        title: <FormattedMessage id="Data Health" />,
        type: "item",
        url: "/data/health",
        icon: icons.DatabaseOutlined,
      },
      {
        id: "upload",
        title: <FormattedMessage id="Document upload" />,
        type: "item",
        url: "/upload",
        icon: icons.CloudUploadOutlined,
      },
      {
        id: "lca",
        title: <FormattedMessage id="LCA" />,
        type: "item",
        url: "/lca",
        icon: LCAIcon,
      },
    ],
  },
  {
    id: "group-settings",
    icon: icons.IdcardOutlined,
    type: "group",
    children: [
      {
        id: "settings",
        title: <FormattedMessage id="Settings" />,
        type: "item",
        url: "/settings",
        icon: icons.SettingOutlined,
      },
    ],
  },
]

export default natixarNav
