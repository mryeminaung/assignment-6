import { Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (!authUser) {
      navigate("/");
    }
  }, []);

  return <>{authUser && children}</>;
};

export default ProtectedRoute;
