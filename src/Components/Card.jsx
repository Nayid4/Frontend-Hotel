import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import Calificacion from "./Calificacion";

const Cards = ({datos}) => {
  return (
    <Card color="#191919" sx={{ 
        Width: 345, 
        backgroundColor: "#191919",
        transition: "0.2s","&:hover":{ transform: "scale(1.05)"}
        }}>
      <CardActionArea>
        <CardMedia
          component="img"
          sx={{height: 200, width:345}}
          image={datos.imagen}
          alt="Reseña"
        />
        <CardContent sx={{ backgroundColor: "#191919", height: 100 }}>
          <Typography gutterBottom variant="h5" component="div">
            {datos.nombre}
          </Typography>
          <Typography variant="body2" color="white">
            {datos.descripcion}
          </Typography>
        </CardContent>
      </CardActionArea>
      <div className="ml-4">
        <Calificacion></Calificacion>
      </div>
      <CardActions sx={{ backgroundColor: "#191919" }} color="primary">
        <Button size="small" color="primary">
          Compartir
        </Button>
      </CardActions>
    </Card>
  );
};

export default Cards;
