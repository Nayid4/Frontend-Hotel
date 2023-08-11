import axios from "./axios";
export const EnviarSolicitud = async (user, endpoint) =>
  await axios.post(`/${endpoint}`, user);
export const verificacionToken = () => axios.get("/verificar");
export const getReservas = (username) => axios.get(`/reservasuser/${username}`);
export const CreateReserva = async (reserva) =>
  await axios.post("/createreserva", reserva);
export const cerrarSesion = async () => {
  await axios.post("/logout");
};
