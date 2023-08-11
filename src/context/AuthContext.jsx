import { createContext, useState, useContext, useEffect } from "react";
import {
  EnviarSolicitud,
  verificacionToken,
  CreateReserva,
  getReservas,
  cerrarSesion,
} from "../api/registroQuery";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("el useauth deberia estar dentro de un provider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [habitaciones, setHabitaciones] = useState([]);
  const [isAutenticado, setIsAutenticado] = useState(false);
  const [loading, setLoading] = useState(true);
  const registrarse = async (usuario) => {
    try {
      const res = await EnviarSolicitud(usuario, "registrarse");
      console.log("res:", res.data);
      setUser(res.data);
      setIsAutenticado(true);
    } catch (error) {
      console.log(error);
    }
  };
  const crearReserva = async (reserva) => {
    try {
      const res = await crearReserva(reserva);
      console.log("res context:", res);
      // setHabitaciones(res)
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  const getReserva = async () => {
    try {
      const res = await getReservas(user.usuario.nombreUsuario);
      console.log("reservas context :", res.data.reservas);
      setHabitaciones(res.data)
    } catch (error) {
      console.log(error.message);
    }
  };

  const inicioSesion = async (usuario) => {
    try {
      const res = await EnviarSolicitud(usuario, "login");
      console.log("vengo de context res;", res.data);
       setUser(res.data);
      setIsAutenticado(true);
      return res;
    } catch (error) {
      console.log(error.message);
    }
  };
  const logout = async () => {
    try {
      await cerrarSesion();
      // Cookies.remove("token");
      setIsAutenticado(false);
      setUser(null);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    async function verificarLogin() {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAutenticado(false);
        const user1 = {
          auth: false,
        };
        setUser(user1);
        setLoading(false);
      }
      try {
        console.log("cookie", cookies.token);

        const res = await verificacionToken();
        console.log("soy res del token: ", res.data);
        if (!res.data) {
          setIsAutenticado(false);
          setLoading(false);
          return;
        }
        setIsAutenticado(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        const user1 = {
          auth: false,
        };
        setUser(user1);
        console.log(error.message);
        setIsAutenticado(false);
        setLoading(false);
      }
    }
    verificarLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        registrarse,
        user,
        isAutenticado,
        inicioSesion,
        loading,
        habitaciones,
        crearReserva,
        logout,
        getReserva,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
