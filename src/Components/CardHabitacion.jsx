import { Box, Button, Icon, Paper, Typography } from "@mui/material";
import styled from "@emotion/styled";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import AirlineSeatIndividualSuiteIcon from "@mui/icons-material/AirlineSeatIndividualSuite";
import { useNavigate } from "react-router-dom";

// Estilo de la imagen de la habitacion
const Img = styled("img")({
  width: 400,
  height: 400,
  objectFit: "cover",
  objectPosition: "center",
});

// Responsive del carusel de trabajadores
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1024 },
    items: 1,
    slidesToSlide: 3,
  },
  desktop: {
    breakpoint: { max: 1024, min: 800 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

// Funcion que retorna la carta de la habitacion
const Habitacion = ({ bed, auth, activarAlerta, cambiarRoom }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (auth.auth === true) {
      cambiarRoom(bed);
      navigate("/booking");
    } else {
      activarAlerta();
    }
  };

  return (
    <Paper
      key={bed.nombre}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        overflow: "hidden",
        mt: 5,
        background: "#191919",
        transition: "0.2s",
        "&:hover": { transform: "scale(1.05)" },
      }}
    >
      {/*- - Carrusel de imagenes de la habitacion - -*/}
      <Box sx={{ width: 400, height: 400 }}>
        <Carousel showDots={true} responsive={responsive}>
          {bed.imagen.map((i, index) => (
            <Img key={index} src={i} alt="" />
          ))}
        </Carousel>
      </Box>

      {/*- - Informacion de la habitacion - -*/}
      <Box sx={{ flexGrow: 1, display: "grid", gap: 1 }}>
        <Typography variant="h4">{bed.nombre}</Typography>
        <Typography variant="p">
          <Icon>
            <AirlineSeatIndividualSuiteIcon />
          </Icon>{" "}
          {bed.capacidad} Personas
        </Typography>

        <Typography variant="p" color="primary">
          {bed.caracteristicas.join(" - ")}
        </Typography>

        <Typography variant="body1">{bed.descripcion}</Typography>
        <Button variant="contained" onClick={handleClick}>
          Reservar
        </Button>
      </Box>

      {/*- - Precio - -*/}
      <Box sx={{ mr: 2, color: "white" }}>
        <p>Precio:</p>
        <p>$ {bed.precio} COP</p>
      </Box>
    </Paper>
  );
};

export default Habitacion;
