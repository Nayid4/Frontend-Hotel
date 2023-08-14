import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/AlternateEmail";
import imagen from "../assets/images/logo.png";
import Checkbox from "@mui/material/Checkbox";
import { useState, useEffect } from "react";
import "../index.css";
import axios from "axios";
import { Alert, Snackbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function InputWithIcon() {
  const navigate = useNavigate();

  // Estado para mostrar alerta
  const [alerta, setAlerta] = useState({
    open: false,
    tipo: "info",
    texto: "",
  });

  // Estado de los datos del usuario
  const [usuario, setUsuario] = useState({
    nombreUsuario: "",
    password: "",
    correo: "",
  });

  // estado del email
  const [error, setError] = useState({
    error: false,
    message: "",
  });
  console.log("estado error: ", error.message);
  // para validar el email
  const emailValidation = (email) => {
    // expresion regular para validar email
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email);
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  // formulario funcion
  const manejarFormulario = async (evento) => {
    evento.preventDefault();
    //Condicional para verifical que el email este correcto
    if (!emailValidation(usuario.correo)) {
      setError({
        error: true,
        message: "El email no es valido",
      });
      setAlerta({
        open: true,
        tipo: "warning",
        texto: "El email no es valido",
      });
      return;
    }
    console.log(usuario.correo);
    setError({
      error: false,
      message: "",
    });
    try {
      const respuesta = await axios({
        method: "POST",
        url: "http://localhost:4000/api/registrarse  ",
        data: usuario,
      });
      console.log("res:", respuesta.data);

      // Se cambia el estado de la alerta
      setAlerta({
        open: true,
        tipo: "success",
        texto: "Usuario registrado!",
      });
    } catch (error) {
      console.error("Error en la solicitud POST:", error.message);
      // Se cambia el estado de la alerta
      setAlerta({
        open: true,
        tipo: "warning",
        texto: "Error al verificar los datos",
      });
    }
    // console.log(usuario);
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
          <h1 className="text-morado-leo flex justify-center text-[17px] ">
            Registrarse
          </h1>

          {/*- - Nombre de usuario - -*/}
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <AccountCircle sx={{ color: "primary", mr: 1, my: 0.5 }} />
            <TextField
              sx={{ width: "30ch" }}
              name="nombreUsuario"
              variant="standard"
              required
              // id="input-with-username"
              label="User Name"
              inputProps={{ style: { color: "white" } }}
              // manejandoCambios del textfield
              onChange={manejarCambios}
            />
          </Box>

          {/*- - Correo - -*/}
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <EmailIcon sx={{ color: "primary", mr: 1, my: 0.5 }} />
            <TextField
              sx={{ width: "30ch" }}
              name="correo"
              variant="standard"
              type="email"
              // id="input-with-correo"
              required
              label="Correo"
              inputProps={{ style: { color: "white" } }}
              // manejandoCambios textfield
              onChange={manejarCambios}
              //helperText={error.message}
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
              required
              // id="input-with-password"
              label="Password"
              type="Password"
              inputProps={{ style: { color: "white" } }}
              // manejandoCambios textfield
              onChange={manejarCambios}
            />
          </Box>

          {/*- - Condiciones - -*/}
          <div className="flex justify-center m-2">
            <p className="text-[#f7f7f7] text-sm/[17px] ">
              <Checkbox {...label} required size="normal" />
              He leído y acepto los términos y condiciones
            </p>
          </div>

          {/*- - Boton registrar - -*/}
          <button
            className="bg-[#580ef6] rounded-full w-72 h-10 m-1 ef"
            type="submit"
          >
            Registrarse
          </button>

          {/*- - en caso de ya tener una cuenta - -*/}
          <div className="flex justify-center m-1">
            <p className="text-[#f7f7f7] text-sm/[17px] pr-1">
              ¿Ya tienes una cuenta?
            </p>
            <Typography
              variant="p"
              className="text-[#580ef6] text-sm/[17px] "
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              iniciar sesión
            </Typography>
          </div>
        </form>

        {/*- - Notficacion de alerta - -*/}
        <Snackbar
          open={alerta.open}
          autoHideDuration={2000}
          onClose={() => setAlerta({ open: false, tipo: "info", texto: "" })}
        >
          <Alert variant="filled" severity={alerta.tipo}>
            {alerta.texto}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
