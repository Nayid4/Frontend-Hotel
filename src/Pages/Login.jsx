import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Lock";
import imagen from "../assets/images/logo.png";
import { useState } from "react";
import "../index.css";
import { Typography } from "@mui/material";
import { Await, useNavigate } from "react-router-dom";
import Alert from "../Components/Alert";
// import { EnviarSolicitud } from "../api/registroQuery";
import { useAuth } from "../context/AuthContext";

export default function Login({ cambiarEstadoAuth }) {
  const { inicioSesion } = useAuth();
  const navigate = useNavigate();

  // Estado para mostrar alerta
  const [alerta, setAlerta] = useState({
    open: false,
    tipo: "info",
    texto: "",
  });

  // estados
  const [usuario, setUsuario] = useState({
    nombreUsuario: "",
    password: "",
  });
  // formulario funcion
  const manejarFormulario = async (evento) => {
    evento.preventDefault();
    try {
      const respuesta = await inicioSesion(usuario);
      //console.log("user: ",usuario);
      console.log("respuesta 1:", respuesta.data);
      // Alertas dependiendo de la respuesta
      if (respuesta.data.auth === false) {
        console.log("respuesta: ", respuesta.data);
        // Se cambia el estado de la alerta
        setAlerta({
          open: true,
          tipo: "error",
          texto: "Usuario o Contraseña incorrectos!",
        });
      } else {
        cambiarEstadoAuth({
          auth: respuesta.data.auth,
          userName: respuesta.data.usuario.nombreUsuario,
        }); // Cambiar el estado de "auth"
        console.log("User Name: ", respuesta.data.usuario.nombreUsuario);
        navigate("/");
      }
    } catch (error) {
      console.error("Error en la solicitud POST:", error.message);
      // Se cambia el estado de la alerta
      setAlerta({
        open: true,
        tipo: "warning",
        texto: "Error al verificar los datos",
      });
    }
    console.log(usuario);
  };
  // capturando usuario
  const manejarCambios = (evento) => {
    setUsuario({ ...usuario, [evento.target.name]: evento.target.value });
    // console.log(evento.name, evento.target.value);
  };
  return (
    <div className="flex justify-center">
      <div
        className="box-login  rounded-[30px] flex flex-col justify-center items-center
        bg-[#191919] w-1/2 h-96 mb-10"
      >
        <div className="flex justify-center">
          <img className="h-10" src={imagen} alt="" />
        </div>
        <form onSubmit={manejarFormulario}>
          <h1 className="text-morado-leo  font-bold flex justify-center text-[20px] ">
            Log In
          </h1>

          {/*- - Nombre de usuario - -*/}
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <AccountCircle sx={{ color: "primary", mr: 1, my: 0.5 }} />
            <TextField
              sx={{ width: "30ch" }}
              name="nombreUsuario"
              variant="standard"
              // id="input-with-username"
              label="User Name"
              required
              inputProps={{ style: { color: "white" } }}
              // manejandoCambios del textfield
              onChange={manejarCambios}
            />
          </Box>

          {/*- - Contraseña - -*/}
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <PasswordIcon sx={{ color: "primary", mr: 1, my: 0.5 }} />
            <TextField
              sx={{ width: "30ch" }}
              name="password"
              size="Normal"
              variant="standard"
              // id="input-with-password"
              required
              label="Password"
              type="Password"
              inputProps={{ style: { color: "white" } }}
              // manejandoCambios textfield
              onChange={manejarCambios}
            />
          </Box>
          <div className="flex justify-end m-2">
            <p className="text-[#f7f7f7] text-sm/[17px] ">
              ¿olvidaste tu contraseña?
            </p>
          </div>
          <Alert alerta={alerta} setAlerta={setAlerta} />

          <button
            className="bg-[#580ef6] rounded-full w-72 h-10 m-1 ef"
            type="submit"
          >
            Iniciar Sesion
          </button>
          <div className="flex justify-center m-1">
            <p className="text-[#f7f7f7] text-sm/[17px] pr-1">
              ¿No tienes cuenta?
            </p>
            <Typography
              variant="p"
              className="text-[#580ef6] text-sm/[17px] "
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/registro")}
            >
              Registrarse
            </Typography>
          </div>
        </form>
      </div>
    </div>
  );
}
