import {
  Box,
  Container,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  TextField,
  Checkbox,
  Link,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  Step,
  Stepper,
  StepLabel,
  CssBaseline
} from "@mui/material";

import React, { useState, Fragment, createContext } from "react";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import Alert from "../Components/Alert";
import PaymentForm from "../Components/PaymentForm";
import AddressForm from "../Components/AdressForm";
import InvoiceForm from "../Components/InvoiceForm";


const steps = ['Datos De Contacto', 'Detalles De Pago', 'Detalles De Orden'];
export  const userContext = createContext();

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <InvoiceForm />;
    default:
      throw new Error('Unknown step');
  }
}

function Booking({ room, auth }) {
  // Estado para mostrar alerta
  const [alerta, setAlerta] = useState({
    open: false,
    tipo: "info",
    texto: "",
  });

  // Estado del obejto que guarda la informacion de la reserva
  const [datosReserva, setDatosReserva] = useState({});

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  //- - - - - - - - - - - - - - - - - - - - - - - - - - - -  -- - - - -- - - - - - - -- - -

  // Estados de los datos del formulario de reserva
  const [adultos, setAdultos] = useState(0);
  const [ninos, setNinos] = useState(0);
  const habitacion = room.nombre;
  const [DateInicio, setDateInicio] = useState(null);
  const [DateFinal, setDateFinal] = useState(null);

  // Funciones onChanges
  const handleChangeAdultos = (event) => {
    setAdultos(event.target.value);
  };

  const handleChangeNinos = (event) => {
    setNinos(event.target.value);
  };

  //- - - - - - - - - - - - - - - - - - - - - - - - - - - -  -- - - - -- - - - - - - -- - -

  // Estados del formulario de datos del Cliente
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Funciones para obtener los valores de las cajas de texto
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };
  //- - - - - - - - - - - - - - - - - - - - - - - - - - - -  -- - - - -- - - - - - - -- - -
  
  // Estados del formulario de datos de la forma de pago

  // Estado para el campo "Titular"
  const [cardName, setCardName] = useState("");

  // Estado para el campo "Número de tarjeta"
  const [cardNumber, setCardNumber] = useState("");

  // Estado para el campo "Fecha De Vencimiento"
  const [DateVencimiento, setDateVencimiento] = useState(null);

  // Estado para el campo "CVV"
  const [cvv, setCvv] = useState("");

  // Estado para el checkbox "Estoy de acuerdo con los términos y condiciones"
  const [agreeTerms, setAgreeTerms] = useState(false);

  const titulosReserva = [
    "Fecha De Ingreso:",
    "Fecha De Salida:",
    "Adultos:",
    "Niños:",
    "Habitacion:",
  ];
  const cant = [0, 1, 2, 3, 4];

  // Estado de reserva
  const [reservaHabitacion, setReservaHabitacion] = useState(false);

  // Evento del boton  reservar para realizar la reserva
  const handleClickReservaHabitacion = () => {
    const updatedDatosReserva = {
      identificador: auth.userName,
      reservas: {
        fechaIngreso: 1623628800001,
        fechaSalida: 1623628800001,
        adultos: parseInt(adultos),
        niños: parseInt(ninos),
        habitacion: habitacion,
      },
      contacto: {
        nombre: firstName,
        apellido: lastName,
        correo: email,
        telefono: phone,
      },
      pago: {
        titular: cardName,
        tarjeta: parseInt(cardNumber),
        fechaVencimiento: 1623628800001,
        cvv: parseInt(cvv),
      },
      precio: room.precio,
    };

    setDatosReserva(updatedDatosReserva);

    try {
      const realizarReserva = async () => {
        const result = await axios({
          method: "POST",
          url: "http://localhost:4000/api/createreserva",
          data: updatedDatosReserva,
        });

        console.log(result);
      };
      realizarReserva();
      setAlerta({
        open: true,
        tipo: "success",
        texto: "Reserva realizada!",
      });
    } catch (error) {
      console.error("Error en la solicitud POST:", error.message);
      // Se cambia el estado de la alerta
      setAlerta({
        open: true,
        tipo: "warning",
        texto: "Error al realizar la reserva",
      });
    }

    setReservaHabitacion(true);
  };


  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <Container component="main" maxWidth="md" sx={{ mb: 4, pt: 20 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Reserva
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </Box>
            </Fragment>
          )}
        </Paper>
      </Container>
    </React.Fragment>
  );
}

export default Booking;
