import React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

export default function Footer() {
  return (
    <Box component={"footer"} sx={{justifyContent:"center", 
    width:"100%", 
    bottom:"0px", 
    left:"0px"}}>
      <Typography
        sx={{ padding: 3, boxShadow:"0px -2px 4px rgba(88, 14, 246, 0.25)" }}
        variant="body2"
        align="center"
      >
        {"Copyright © "}
        <Link color="secondary" href="#">
          Los Misioneros
        </Link>{" "}
        {new Date().getFullYear()}
      </Typography>
    </Box>
    
  );
}
