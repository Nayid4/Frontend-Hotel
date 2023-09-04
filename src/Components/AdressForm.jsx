import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Container } from '@mui/material';

export default function AddressForm() {
    //- - - - - - - - - - - - - - - - - - - - - - - - - - - -  -- - - - -- - - - - - - -- - -

  // Estados del formulario de datos del Cliente
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");

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

  return (
    <React.Fragment>
        {/*- - - - - - - - - Formulario de Cliente - - - - - - - - -*/}
        <Container sx={{height: 250}}>
            {/*- - Titulo de datos de contacto - -*/}
            <Typography variant="h6" sx={{color: "black"}} gutterBottom>
                Datos De Contacto
            </Typography>

            <Grid container spacing={5}>
                {/*- - Nombre- -*/}
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="Nombre"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        onChange={handleFirstNameChange}
                    />
                </Grid>

                {/*- - Apellido - -*/}
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Apellido"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                        onChange={handleLastNameChange}
                    />
                </Grid>

                {/*- - Correo - -*/}
                <Grid item xs={6} sm={6}>
                    <TextField
                        required
                        id="email"
                        name="email"
                        label="Correo"
                        fullWidth
                        variant="standard"
                        onChange={handleEmailChange}
                    />
                </Grid>

                {/*- - Telefono - -*/}
                <Grid item xs={6} sm={6}>
                    <TextField
                        required
                        id="phone"
                        name="phone"
                        label="Telefono"
                        fullWidth
                        variant="standard"
                        onChange={handlePhoneChange}
                    />
                </Grid>

                <Grid item xs={12}>
                    <FormControlLabel
                    control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                    label="Usar esta dirección para detalles de pago"
                    />
                </Grid>
            </Grid>
        </Container>
    </React.Fragment>
  );
}