import { React, useState, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import Habitacion from "../Components/CardHabitacion";

import axios from "axios";
import Alert from "../Components/Alert";

export default function Bed({ cambiarRoom, auth }) {
  // Estado para las habitaciones
  const [habitaciones, setHabitaciones] = useState([]);

  // Estado para mostrar alerta
  const [alerta, setAlerta] = useState({
    open: false,
    tipo: "info",
    texto: "",
  });

  const activarAlerta = () => {
    setAlerta({
      open: true,
      tipo: "info",
      texto: "Inicie sesion para poder reservar!",
    });
  };

  useEffect(() => {
    const obtenerHabitaciones = async () => {
      const result = await axios({
        method: "GET",
        url: "http://localhost:4000/api/Habitaciones",
      });

      console.log(result.data);

      setHabitaciones(result.data.habitaciones);
    };
    obtenerHabitaciones();
  }, []);

  return (
    <>
      {/*- - Titulo - -*/}
      <Box>
        <div className=" flex justify-center">
          <h1 className="text-morado-leo  font-bold text-[40px] ">
            Habitaciones Disponibles
          </h1>
        </div>
        {/*- - Contenido - -*/}
      </Box>
      <Container maxWidth="md" sx={{ padding: 0, marginBottom: 5 }}>
        {/*- - Carta de la habitacion - -*/}
        {habitaciones.map((bed, i) => (
          <Box key={i}>
            <Habitacion
              key={i}
              bed={bed}
              auth={auth}
              activarAlerta={activarAlerta}
              cambiarRoom={cambiarRoom}
            />
          </Box>
        ))}

        {/*- - Alerta - -*/}
        <Alert alerta={alerta} setAlerta={setAlerta} />
      </Container>
    </>
  );
}
