import {React, useState, useEffect} from 'react'
import {Box, Container, Grid, Typography, Paper} from "@mui/material";
import Habitacion from "../Components/CardHabitacion"
import imagen from "../assets/images/habitacion-1.jpg";
import imagen2 from "../assets/images/habitacion-2.jpg";
import axios from 'axios'
import Alert from "../Components/Alert"


export default function Bed({cambiarRoom, auth}){

    // Estado para las habitaciones
    const [habitaciones,setHabitaciones] = useState([])

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
            texto: "Inicie sesion para poder reservar!"
        })
    }

    useEffect(() => {
        const obtenerHabitaciones = async () => {
        const result = await axios({
            method: "GET",
            url: "http://localhost:4000/api/Habitaciones",
        });

        console.log(result.data)

        setHabitaciones(result.data.habitaciones)

        }
        obtenerHabitaciones()
    },[])

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
                    marginBottom: 10,
                    fontSize: 50,
                }}
                >
                Habitaciones
                </Typography>
            {/*- - Contenido - -*/}
            </Box>
            <Container 
                maxWidth="md"
                sx={{padding: 5, marginBottom: 5 }}
            >
                {/*- - Carta de la habitacion - -*/}
                {habitaciones.map((bed,i) => (
                    <Box key={i}>
                        <Habitacion key={i} bed={bed} auth={auth} activarAlerta={activarAlerta} cambiarRoom={cambiarRoom}/>
                    </Box>
                ))}

                {/*- - Alerta - -*/}
                <Alert alerta={alerta} setAlerta={setAlerta} />

            </Container>
        </>
    )
}
