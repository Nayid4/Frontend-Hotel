import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export const ProtegerRutas = () => {
  const { isAutenticado, loading } = useAuth();
  console.log("loding: ", loading);
  console.log("atenticado: ", isAutenticado);
  if (loading) {
    <h1>cargando...</h1>;
  }
  if (!loading && !isAutenticado) {
    return <Navigate to="/login" replace></Navigate>;
  }
  return <Outlet />;
};
