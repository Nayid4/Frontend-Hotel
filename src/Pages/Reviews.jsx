import { React, useState, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import Card from "../Components/Card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";

export default function Review() {
  const [resenas, setResenas] = useState([]);

  useEffect(() => {
    const obtenerResenas = async () => {
      const result = await axios({
        method: "GET",
        url: "http://localhost:4000/api/resenas",
      });

      //console.log(result.data)

      setResenas(result.data.resenas);
    };
    obtenerResenas();
  }, []);

  console.log(resenas);
  console.log(typeof resenas);
  console.log(resenas[0]);

  // Responsive del carusel de trabajadores
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 3,
      slidesToSlide: 2,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

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
            marginBottom: 15,
            fontSize: 50,
          }}
        >
          Reseñas
        </Typography>
      </Box>
      {/*- - Contenido - -*/}
      <Container maxWidth="md" sx={{ background: "#101010", marginBottom: 3 }}>
        {/*- - Se muestra el carrusel - -*/}
        <Carousel showDots={true} responsive={responsive}>
          {resenas.map((info, i) => (
            <Box key={i} sx={{ marginRight: 5 }}>
              {/*- - Carta de la reseña - -*/}
              <Card datos={info} />
            </Box>
          ))}
        </Carousel>
      </Container>
    </>
  );
}
