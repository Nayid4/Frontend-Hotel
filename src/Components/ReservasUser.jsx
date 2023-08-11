import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
// import { useHabitacion } from "../context/HabitacionesContext";
import HabitacioCard from "../Components/HabitacionUser"
export const ReservasUser = () => {
  const { user, getReserva, habitaciones } = useAuth();
  const username = user.usuario.nombreUsuario;
  console.log("habita", habitaciones.reservas);
  const prueba = habitaciones;

  useEffect(() => {
    getReserva();
  }, []);
  console.log(username);
  return (
    <div>
      <h1 className="flex justify-center">Habitaciones reservadas</h1>
      <div className="grid grid-cols-3 ">
        {prueba.map((habitacion) => (
          <HabitacioCard  habitacion={habitacion} key={habitacion._id}>

          </HabitacioCard>
        ))}
        {/* <h2 className="p-7">nombre de la habitacion: </h2> */}
      </div>
    </div>
  );
};
