import { Navigate } from "react-router";
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

  if (allowedRoles) {
    const userRole = user?.isAdmin ? 'admin' : 'user'; 
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};