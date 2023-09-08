import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Stepper,
  Step,
  StepLabel
} from "@mui/material";

import React, { useState, Fragment, createContext } from "react";

import axios from "axios";
import Alert from "../Components/Alert";
import PaymentForm from "../Components/PaymentForm";
import AddressForm from "../Components/AdressForm";
import InvoiceForm from "../Components/InvoiceForm";
import BookingForm from "../Components/BookingForm";


const steps = ['Datos de reserva','Datos De Contacto', 'Detalles De Pago', 'Detalles De Orden'];
export const reservaContext = createContext();
export const userContext = createContext();
export const pagoContext = createContext();


function Booking({ room, auth }) {
  // Estado para mostrar alerta
  const [alerta, setAlerta] = useState({
    open: false,
    tipo: "info",
    texto: "",
  });

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  //- - - - - - - - - - - - - - - - - - - - - - - - - - - -  -- - - - -- - - - - - - -- - -

  // Estados de los datos del formulario de reserva
  const [reservas, setReservas] = useState({
    fechaIngreso: "",
    fechaSalida: "",
    adultos: 0,
    niños: 0,
    habitacion: room.nombre+"",
  });


  //- - - - - - - - - - - - - - - - - - - - - - - - - - - -  -- - - - -- - - - - - - -- - -

  // Estados del formulario de datos del Cliente
  const [contacto, setContacto] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    }) ;

  //- - - - - - - - - - - - - - - - - - - - - - - - - - - -  -- - - - -- - - - - - - -- - -
  
  // Estados del formulario de datos de la forma de pago
  const [pago, setPago] = useState({
    titular: "",
    tarjeta: 0,
    fechaVencimiento: "",
    cvv: 0
  });

  const titulosReserva = [
    "Fecha De Ingreso:",
    "Fecha De Salida:",
    "Adultos:",
    "Niños:",
    "Habitacion:",
  ];
  const cant = [0, 1, 2, 3, 4];

  // Evento del boton  reservar para realizar la reserva
  const guardarInfo = () => {
    const updatedDatosReserva = {
      identificador: auth.userName,
      reservas,
      contacto,
      pago,
      precio: room.precio,
    };

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
  };


  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    console.log(reservas);
    console.log(contacto);
    console.log(pago);
    if(activeStep === steps.length - 1){
      guardarInfo();
    }
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
              {/*getStepContent(activeStep)*/}
              {activeStep === 0 ? <reservaContext.Provider value={{reservas, setReservas}}>
                <BookingForm />
              </reservaContext.Provider> :
              activeStep === 1 ? <userContext.Provider value={{contacto, setContacto}}>
                <AddressForm />
              </userContext.Provider> : 
              activeStep === 2 ? <pagoContext.Provider value={{pago, setPago}}>
                <PaymentForm />
              </pagoContext.Provider> : 
              activeStep === 3 ? <InvoiceForm /> : null}
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
