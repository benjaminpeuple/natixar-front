import { useFusionAuth } from "@fusionauth/react-sdk"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { GuardProps } from "types/auth"
import { getFusionConfig } from "./FusionConfiguration"

// ==============================|| AUTH GUARD ||============================== //

const GuestGuard = ({ children }: GuardProps) => {
  const { isAuthenticated } = useFusionAuth()
  const { enabled: fusionIsEnabled } = getFusionConfig()

  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    if (!fusionIsEnabled || fusionIsEnabled === "false" || isAuthenticated) {
      navigate("/")
    }
  }, [fusionIsEnabled, isAuthenticated, navigate, location])
  return children
}

export default GuestGuard
