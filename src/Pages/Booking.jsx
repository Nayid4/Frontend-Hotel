import {Box, 
    Container, 
    Typography, 
    FormControl, 
    InputLabel, 
    MenuItem, 
    Select, 
    Grid, 
    TextField,
    FormControlLabel,
    Checkbox
 } from "@mui/material";
import React,{useState, useEffect, Fragment } from "react";
import {Paper, Button, List, ListItem, ListItemText} from '@mui/material';
import {LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {DatePicker} from '@mui/x-date-pickers/DatePicker'
import axios from "axios";
import Alert from "../Components/Alert"
import { useAuth } from "../context/AuthContext";


function Booking({room, auth}) {
    const {createReserva}=useAuth();

    // Estado para mostrar alerta
    const [alerta, setAlerta] = useState({
        open: false,
        tipo: "info",
        texto: "",
    });

    // Estado del obejto que guarda la informacion de la reserva
    const [datosReserva, setDatosReserva] = useState({})

    const label = { inputProps: { "aria-label": "Checkbox demo" } };


    //- - - - - - - - - - - - - - - - - - - - - - - - - - - -  -- - - - -- - - - - - - -- - -

    // Estados de los datos del formulario de reserva
    const [adultos, setAdultos] = useState(0);
    const [ninos, setNinos] = useState(0);
    const habitacion = room.nombre
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
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');

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
    const [cardName, setCardName] = useState('');

    // Estado para el campo "Número de tarjeta"
    const [cardNumber, setCardNumber] = useState('');

    // Estado para el campo "Fecha De Vencimiento"
    const [DateVencimiento, setDateVencimiento] = useState(null);

    // Estado para el campo "CVV"
    const [cvv, setCvv] = useState('');

    // Estado para el checkbox "Estoy de acuerdo con los términos y condiciones"
    const [agreeTerms, setAgreeTerms] = useState(false);


    
    //- - - - - - - - - - - - - - - - - - - - - - - - - - - -  -- - - - -- - - - - - - -- - -

    const titulosReserva =["Fecha De Ingreso:", "Fecha De Salida:", "Adultos:", "Niños:", "Habitacion:"]
    const cant = [0,1,2,3,4]

    // Estado de reserva
    const [reservaHabitacion, setReservaHabitacion] = useState(false)

    // Evento del boton  reservar para realizar la reserva
    const handleClickReservaHabitacion = () => {
        
        const updatedDatosReserva = {
            identificador: auth.userName,
            reservas: {
              fechaIngreso:  new Date(DateInicio),
              fechaSalida: new Date(DateFinal),
              adultos: parseInt(adultos),
              niños: parseInt(ninos),
              habitacion: habitacion
            },
            contacto: {
              nombre: firstName,
              apellido: lastName,
              correo: email,
              telefono: phone
            },
            pago: {
              titular: cardName,
              tarjeta: parseInt(cardNumber),
              fechaVencimiento: new Date(DateVencimiento),
              cvv: parseInt(cvv)
            },
            precio: room.precio
          };
        
          setDatosReserva(updatedDatosReserva);


        try {
            const realizarReserva = async () => {
                const result = await axios({
                    method: "POST",
                    url: "http://localhost:4000/api/createreserva",
                    data: updatedDatosReserva,
            });
                
                console.log(result)
            }
            realizarReserva()
            setAlerta({
                open: true,
                tipo: "success",
                texto: "Reserva realizada!"
            })
          } catch (error) {
            console.error("Error en la solicitud POST:", error.message);
            // Se cambia el estado de la alerta
            setAlerta({
              open: true,
              tipo: "warning",
              texto: "Error al realizar la reserva"
            })
          }

        setReservaHabitacion(true)

    }

    

    return (
        <>
            {/*- - Titulo - -*/}
            <Box>
                <Typography
                variant="h1"
                color="primary"
                component="div"
                sx={{
                    textAlign: "center",
                    marginTop: 10,
                    marginBottom: 5,
                    fontSize: 50,
                }}
                >
                Reservass
                </Typography>
                
            </Box>

            {/*- - Contenido del formulario - -*/}
            <Container maxWidth="md" sx={{marginBottom: 5}}>
            <Paper  sx={{paddingBottom: 3, paddinBottom: 2}}>
                    {/*- - Condicion para mostrar la factura o el formulario */}
                    {reservaHabitacion === true ? (
                        <Fragment>
                            <Container>

                                {/*- - Informacion de reserva - -*/}
                                <Typography variant="h3" gutterBottom sx={{color: "black", textAlign: "center"}}>
                                    FACTURA DE LA RESERVA
                                </Typography>

                                {/*- - Informacion de reserva - -*/}
                                <Typography variant="h6" gutterBottom sx={{color: "black"}}>
                                    Resumen De Reserva
                                </Typography>
                                <List disablePadding>
                                    
                                    {Object.entries(datosReserva.reservas).map(([clave, valor]) => (
                                        <ListItem key={clave} sx={{ py: 1, px: 0 }}>
                                            <ListItemText
                                            sx={{ color: "black" }}
                                            primary={clave}
                                            secondary={clave === 'fechaIngreso' || clave === 'fechaSalida' ?  new Date(valor).toLocaleDateString('es-ES') : valor}
                                            />
                                        </ListItem>
                                    ))}

                                    <ListItem sx={{ py: 1, px: 0 }}>
                                    <ListItemText sx={{color: "black"}} primary="Total" />
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "black" }}>
                                        $ {room.precio}
                                    </Typography>
                                    </ListItem>
                                </List>
                                <Grid container spacing={2}>

                                    {/*- - Informacion de contacto - -*/}
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="h6" gutterBottom sx={{ mt: 2, color: "black" }}>
                                            Contacto
                                        </Typography>

                                        {Object.entries(datosReserva.contacto).map(([clave, valor]) => (
                                            <Typography key={clave} gutterBottom sx={{ color: "black" }}>
                                                {clave}: {valor}
                                            </Typography>
                                        ))}

                                    </Grid>

                                    {/*- - Detalles de pago - -*/}
                                    {<Grid item  xs={12} sm={6}>
                                        <Typography variant="h6" gutterBottom sx={{ mt: 2, color: "black" }}>
                                            Detalles De Pago
                                        </Typography>

                                        {Object.entries(datosReserva.pago).map(([clave, valor]) => (
                                            <Typography key={clave} gutterBottom sx={{ color: "black" }}>
                                                {clave}: {clave === 'fechaVencimiento' ? new Date(valor).toLocaleDateString('es-ES') : valor}
                                            </Typography>
                                        ))}

                                    </Grid>}

                                </Grid>
                                </Container>
                        </Fragment>
                    ) : (
                        <Fragment >
                            <Container
                                
                                sx={{ background: "white", marginBottom: 5, marginTop: 10, paddingTop: 5}}
                                component="form"
                                onSubmit={handleClickReservaHabitacion}
                            >
                                
                        {/*- - - - - - - - Formulario de reserva - - - - - - - -*/}
                                
                                <Grid container spacing={5}>

                                    {/*- - Titulo de datos de reserva - -*/}
                                    <Grid item xs={12} sm={12}>
                                        <Typography variant="h6" sx={{color: "black"}} gutterBottom>
                                            Datos De Reserva
                                        </Typography>
                                    </Grid>

                                    {/*- - Fecha de ingreso - -*/}
                                    <Grid item xs={12} sm={6}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                            label="Fecha De Ingreso"
                                            value={DateInicio}
                                            required
                                            onChange={(newDate) => setDateInicio(newDate)}
                                            renderInput={(props) => <TextField required variant="standard" fullWidth {...props}/>}
                                            />
                                        </LocalizationProvider>
                                    </Grid>

                                    {/*- - Fecha de salida - -*/}
                                    <Grid item xs={12} sm={6}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                            label="Fecha De Salida"
                                            value={DateFinal}
                                            onChange={(newDate) => setDateFinal(newDate)}
                                            renderInput={(props) => <TextField required variant="standard" fullWidth {...props}/>}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    
                                    {/*- - Cantidad de adultos - -*/}
                                    <Grid item xs={12} sm={4}>
                                        <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                                            <InputLabel id="demo-simple-select-standard-label">Adultos</InputLabel>
                                            <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            value={adultos}
                                            onChange={handleChangeAdultos}
                                            label="Adultos"
                                            >
                                            <MenuItem value={0}>0</MenuItem>
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    {/*- - Cantidad de niños - -*/}
                                    <Grid item xs={12} sm={4}>
                                        <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                                            <InputLabel id="demo-simple-select-standard-label">Niños</InputLabel>
                                            <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            value={ninos}
                                            onChange={handleChangeNinos}
                                            label="Niños"
                                            >
                                            <MenuItem value={0}>0</MenuItem>
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    
                                    {/*- - Habitacion - -*/}
                                    <Grid item xs={12} sm={4}>
                                        <TextField 
                                            disabled
                                            id="outlined-disabled"
                                            label={habitacion}
                                        />
                                    </Grid>
                                

                        {/*- - - - - - - - - Formulario de Cliente - - - - - - - - -*/}
                                
                                    {/*- - Titulo de datos de contacto - -*/}
                                    <Grid item sx={12} sm={12}>
                                        <Typography variant="h6" sx={{ color: "black" }} gutterBottom>
                                        Datos De Contacto
                                        </Typography>
                                    </Grid>

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
                                        value={firstName}
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
                                        value={lastName}
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
                                        value={email}
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
                                        value={phone}
                                        onChange={handlePhoneChange}
                                        />
                                    </Grid>
                                

                        {/*- - - - - - - Formulario de forma de pago - - - - - - -*/}
                                
                                    {/*- - Titulo de metodo de pago - -*/}
                                    <Grid item xs={12} sm={12}>
                                        <Typography variant="h6" sx={{ color: "black" }} gutterBottom>
                                        Metodo De Pago
                                        </Typography>
                                    </Grid>

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
                                            renderInput={(props) => <TextField required variant="standard" fullWidth {...props}/>}
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
                                        <Typography sx={{color: "black"}}>
                                            <Checkbox {...label} required/>
                                            Estoy de acuerdo con los términos y condiciones.
                                        </Typography>
                                    </Grid>
                                    
                                </Grid>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    sx={{ mt: 3, ml: 1 }}
                                    >
                                    Realizar Reserva
                                </Button>
                            </Container>
                        </Fragment>
                    )}
                </Paper>
                
                {/*- - Notficacion de alerta - -*/}
                <Alert alerta={alerta} setAlerta={setAlerta} />
            </Container>
            
            
        </>
    )
}


export default Booking