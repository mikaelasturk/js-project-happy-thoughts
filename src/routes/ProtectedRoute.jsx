import { Navigate, Outlet } from "react-router-dom"
import { useUserStore } from "../store"

export const ProtectedRoute = () => {
  const user = useUserStore((state) => state.user) 
  
  const accessToken =
    user?.accessToken || user?.savedUser?.accessToken

  if (!accessToken) {
    return <Navigate to="/logga-in" replace />
  }

  return <Outlet />
}
