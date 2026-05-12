
// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token")

  // No token → kick back to login immediately
  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute