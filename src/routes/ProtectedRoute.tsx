import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

type Props = {
  children: React.JSX.Element
  allowedRoles?: string[];
};

export const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};
