import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const AdminRoute = ({ children }) => {
  const { user } = useAuthStore();

  // If user is logged in AND is an admin, grant access
  if (user && user.isAdmin) {
    return children;
  }

  // Otherwise, bounce back to the archive
  return <Navigate to="/" replace />;
};

export default AdminRoute;
