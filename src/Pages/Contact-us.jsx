import React from 'react'
import {Box, Container, Grid, Typography} from "@mui/material";
import imagen from "../assets/images/mapa.jpg";
import styled from "@emotion/styled";


// Estilo de la imagen de la habitacion
const Img = styled("img")({
    width: 400,
    height: 400,
    objectFit: "cover",
    objectPosition: "center"
})

const Contact = () => {
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
                Contacto
                </Typography>
            </Box>
            {/*- - Contenido- -*/}
            <Container 
                maxWidth="md"
                sx={{ background: "#191919", marginBottom: 5, marginTop: 10}}
            >
                <Grid container spacing={3}>
                    {/*- - Introduccion- -*/}
                    <Grid item xs={6}>
                        <Box sx={{margin: 3}}>
                            <Typography variant='h1' color= "primary" sx={{fontSize: 30, margin: 2, textAlign: 'center'}}>
                                Información de contacto
                            </Typography>
                            <Typography variant='ul'>
                                Teléfonos Fijos:<br/>+57 (5) 8576694 - +57 (5) 8769453<br/><br/>
                                Celulares:<br/>3025068293 - 3045968342 - 3205869345<br/><br/>
                                E-mail:<br/>admin@losmisiones.com
                            </Typography>
                        </Box>
                    </Grid>
                    
                    {/*- - Ubicacion - -*/}
                    <Grid item xs={6}>
                        <Box sx={{margin: 3}}>
                            <Typography variant='h1' color= "primary" sx={{fontSize: 30, margin: 2, textAlign: 'center'}}>
                                Ubicacion
                            </Typography>
                            <Typography variant='p' sx={{marginBottom: 10}}>
                                Direccion: <br/>Transversal 20 #10-20
                            </Typography>
                            <Img src={imagen} alt=''/>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Contact