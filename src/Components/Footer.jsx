import React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <Typography
      sx={{ padding: 3 }}
      className="shadow-custom-a"
      variant="body2"
      color="Primary"
      align="center"
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Los Misioneros
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}
