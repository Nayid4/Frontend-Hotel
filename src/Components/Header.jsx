import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import Logo from "../assets/images/Logo.png";
import {
  Button,
  MenuItem,
  Menu,
  IconButton,
  Box,
  Typography,
  AppBar,
  Container,
  Toolbar,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import IconButtom from "./IconButtom";

export default function Header({ ListaMenu,auth, cambiarEstadoAuth }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const navigate = useNavigate();

  const menu = [
    {
      titulo:"Perfil",
      path:"/profile",
    },
    {
      titulo:"Reservas",
      path:"/your-booking",
    },
    {
      titulo:"Cerrar Sesion",
      path:"Cerrar",
    }
  ];

  return (
    <AppBar color="third">
      <Container maxWidth="x1" color="inherit"> 
        <Toolbar disableGutters>
          {/*- - Icono Responsive - - */}
          <Link to="/" sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
            <img className="logo-main" src={Logo} alt="" />
          </Link>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'flex' },
              flexGrow: 0,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Los Misioneros
          </Typography>

          {/*- - Menu Responsive - -*/}
          <Box sx={{ justifyContent: 'flex-end',flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          {auth.auth === true ? (
            <IconButtom menu= {menu} auth = {auth} cambiarEstadoAuth={cambiarEstadoAuth}/>
          ) : (<>
          </>)}
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {/*- - Generamos los botones del menu - -*/}
              {ListaMenu.map((page) => (
                <MenuItem key={page.titulo} onClick={() => navigate(page.path)}>
                  <Typography textAlign="center">{page.titulo}</Typography>
                </MenuItem>
              ))}

              {/*- - Si no se ha iniciado sesion generamos los botones de registro - -*/}
              {auth.auth === false ? (
              <Box sx={{ display: 'grid', gridTemplateRows: 'repeat(2, 1fr)' }}>
                {/*- - Boton Iniciar sesion - -*/}
                <Button
                  key={98}
                  className="hover:text-violet-900"
                  sx={{color:"black"}}
                  onClick={() => navigate("/login")}
                >
                  Iniciar Sesion
                </Button>

                {/* Botón Registrar */}
                <Button
                  key={97}
                  className="bg-[#580ef6]"
                  variant="contained"
                  onClick={() => navigate("/registro")}
                  
                >
                  Registrarse
                </Button>
              </Box>
            ):(
            <>
            </>)}
            </Menu>
          </Box>


          {/*- - Generamos los botones del encabezado - -*/}
          <Box sx={{ flexGrow: 1,justifyContent: 'flex-end', display: { xs: 'none', md: 'flex' } }}>
            {ListaMenu.map((page) => (
              <Button
                key={page.path}
                onClick={() => navigate(page.path)}
                sx={{ transition: "0.2s",
                "&:hover": { transform: "scale(1.05)"},my: 2, color: 'white', display: 'block' }}
              >
                {page.titulo}
              </Button>
            ))}
          </Box>

          {/*- - Ponemos los botones de registro o avatar del usuario - -*/}
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }}}>
            {/*- - Botones de Login y Registro de usuario - -*/}
            {auth.auth === false ? (
              <Box sx={{alignItems: 'flex-start'}}>
                {/*- - Boton Iniciar sesion - -*/}
                <Button
                  key={96}
                  sx={{transition: "0.2s",
                  "&:hover": { transform: "scale(1.05)"},borderRadius:"100px", mr:2}}
                  onClick={() => navigate("/login")}
                  variant="outlined"
                >
                  Iniciar Sesion
                </Button>

                {/* Botón Registrar */}
                <Button
                  key={95}
                  variant="contained"
                  onClick={() => navigate("/registro")}
                  sx={{
                    transition: "0.2s",
                    "&:hover": { transform: "scale(1.05)"},borderRadius:"100px"
                  }}
                >
                  Registrarse
                </Button>
              </Box>
            ) : (
              <IconButtom menu= {menu} auth = {auth} cambiarEstadoAuth={cambiarEstadoAuth}/>
            )}
          </Box>
          
        </Toolbar>
      </Container>
    </AppBar>
  );
}
