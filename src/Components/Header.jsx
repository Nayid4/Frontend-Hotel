import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import Logo from "../assets/images/logo.png";
import perfil from "../assets/images/perfil.png";
import {
  Button,
  ButtonGroup,
  MenuItem,
  Menu,
  IconButton,
  Box,
  Avatar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
export default function Header({ auth, cambiarEstadoAuth }) {
  const navigate = useNavigate();
  const { isAutenticado,logout } = useAuth();
  // Estado para abrir el submenu de usuario
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClick = async () => {
    const res = await logout();
    console.log("cerrar: ", res);

    navigate("/");
  };
  // cerrar();

  return (
    <header className="algo py-6 mb-12 ">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <img className="logo-main" src={Logo} alt="" />
        </Link>
        {/* botones */}
        <div className=" flex items-center  gap-6">
          {/*- - Botones Esenciales - -*/}
          <ButtonGroup
            color="secondary"
            variant="text"
            aria-label="text button group"
          >
            <Button className="ef" onClick={() => navigate("/nosotros")}>
              Nosotros
            </Button>
            <Button className="ef" onClick={() => navigate("/reseñas")}>
              Reseñas
            </Button>
            <Button className="ef" onClick={() => navigate("/bed-rooms")}>
              Habitaciones
            </Button>
            {/*<Button className="ef" onClick={() => navigate("/booking")}>Revervas</Button>*/}
            <Button className="ef" onClick={() => navigate("/contact-us")}>
              Contacto
            </Button>
          </ButtonGroup>

          {/*- - Botones de inicio y perfil de usuario - -*/}
          {!isAutenticado ? (
            <Box component="div">
              <Link className="hover:text-violet-900 ef" to="/login">
                Iniciar Sesion
              </Link>
              <button
                className="bg-[#580ef6] rounded-full w-36 h-10 m-3 ef"
                type="submit"
                onClick={() => navigate("/registro")}
                sx={{
                  transition: "0.2s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                Registrarse
              </button>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Abrir Configuracion">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={perfil} />
                </IconButton>
              </Tooltip>
              {/*- - Menu de opciones de usuario - -*/}
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {/*- - Opciones del menu de usuario - -*/}
                <MenuItem onClick={() => navigate("/perfil")}>
                  <Typography textAlign="center">Perfil</Typography>
                </MenuItem>
                <MenuItem onClick={() => navigate("/reservas")}>
                  <Typography textAlign="center">Reservas</Typography>
                </MenuItem>
                <MenuItem onClick={handleClick}>
                  <Typography textAlign="center">Cerrar Sesión</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </div>
      </div>
    </header>
  );
}
