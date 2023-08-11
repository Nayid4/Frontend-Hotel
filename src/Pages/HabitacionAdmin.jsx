import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
export default function BasicTextFields() {
  const currencies = [
    {
      value: "cero",
      label: "0",
    },
    {
      value: "uno",
      label: "1",
    },
    {
      value: "dos",
      label: "2",
    },
    {
      value: "tres",
      label: "3",
    },
    {
      value: "cuatro",
      label: "4",
    },
  ];

  return (
    <div>
      <h1 className="text-morado-leo p-6 font-bold text-[20px] ">
        Registrar Habitaciones
      </h1>
      <div
        className="box-login  rounded-[30px] flex flex-col  items-center
    bg-[] w-1/2 h-full mb-10"
      >
        <form className=" flex justify-center">
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              sx={{ backgroundColor: "#161616" }}
              label="Nombre"
              variant="filled"
              inputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "white" } }}
            />
            <TextField
              sx={{ backgroundColor: "#161616" }}
              label="Img url"
              variant="filled"
              inputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "white" } }}
            />

            <TextField
              sx={{ backgroundColor: "#161616" }}
              select
              label="capacidad"
              defaultValue="cero"
              variant="filled"
              SelectProps={{ style: { color: "white" } }}
              inputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "white" } }}
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              sx={{ backgroundColor: "#161616" }}
              label="precio"
              variant="filled"
              inputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "white" } }}
            />
            <TextField
              sx={{ backgroundColor: "#161616" }}
              label="caracteristicas"
              variant="filled"
              inputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "white" } }}
            />
            <TextField
              sx={{ backgroundColor: "#161616" }}
              label="Descripcion"
              multiline
              rows={4}
              variant="filled"
              inputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "white" } }}
            />
            <button
              type="button"
              class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 m-2"
            >
              Guardar Habitacion
            </button>
          </Box>
        </form>
      </div>
    </div>
  );
}
