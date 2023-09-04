import React, { useState, Fragment } from "react";
import {Typography, 
    Grid, 
    TextField, 
    FormControlLabel, 
    Checkbox} 
    from '@mui/material';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function PaymentForm() {

    const label = { inputProps: { "aria-label": "Checkbox demo" } };

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


  return (
    <React.Fragment>
        {/*- - Titulo de metodo de pago - -*/}
      <Typography variant="h6" gutterBottom>
        Metodo De Pago
      </Typography>
      <Grid container spacing={3}>
        
        {/*- - Titular - -*/}
        <Grid item xs={12} md={6}>
        <TextField
            required
            id="cardName"
            label="Titular"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
        />
        </Grid>

        {/*- - Numero de la tarjeta - -*/}
        <Grid item xs={12} md={6}>
        <TextField
            required
            id="cardNumber"
            label="Número de tarjeta"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
        />
        </Grid>

        {/*- - Fecha de vencimiento - -*/}
        <Grid item xs={12} md={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
            label="Fecha De Vencimiento"
            value={DateVencimiento}
            onChange={(newDate) => setDateVencimiento(newDate)}
            renderInput={(props) => (
                <TextField
                required
                variant="standard"
                fullWidth
                {...props}
                />
            )}
            />
        </LocalizationProvider>
        </Grid>

        {/*- - CVV - -*/}
        <Grid item xs={12} md={6}>
        <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Últimos tres dígitos en la tira de firma"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
        />
        </Grid>

        {/*- - Acuerdos - -*/}
        <Grid item xs={12}>
        <Typography sx={{ color: "black" }}>
            <Checkbox {...label} required />
            Estoy de acuerdo con los términos y condiciones.
        </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}