import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

// We pass 'children' because we are wrapping components directly in App.jsx
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  // If user is verified by the backend at port 4000, show the page
  // Otherwise, kick them back to the login terminal
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
