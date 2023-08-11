import { createContext, useContext, useState } from "react";

export const HabitacionContext = createContext;
export const useHabitacion = () => {
  const context = useContext(HabitacionContext);
  if (!context) {
    throw new Error("el useHabitaciones deberia estar dentro de un provider");
  }
  return context;
};
export const HabitacionProvider = ({ children }) => {
  const [habitaciones, setHabitaciones] = useState(null);

  return (<HabitacionContext value={{habitaciones}} >{children}</HabitacionContext>);
};
