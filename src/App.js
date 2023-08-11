import { React, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

//paginas import
import Home from "./Pages/Home";
import Registro from "./Pages/Registro";
import Reviews from "./Pages/Reviews";
import Booking from "./Pages/Booking";
import Bed from "./Pages/bed-rooms";
import Contact from "./Pages/Contact-us";
import About from "./Pages/About-us";
import Login from "./Pages/Login";
import { Perfil } from "./Pages/perfil";
// import BookingUser from "./Pages/Booking-user";
import { AuthProvider } from "./context/AuthContext";
import { ReservasUser } from "./Components/ReservasUser";
import HabitacionAdmin from "./Pages/HabitacionAdmin";
import { ProtegerRutas } from "./ProtegerRutas";
import { HabitacionProvider } from "./context/HabitacionContext";
// import { HabitacionProvider } from "./context/HabitacionesContext";

function App() {
  // Estado para saber si un usuario inicio sesion
  const [auth, setAuth] = useState({
    auth: false,
    userName: "",
  });

  // Estado para obtener los datos de la habitacion que se reservara
  const [room, setRoom] = useState({});

  // Funcion para cambiar el estado de actividad del cliente
  const cambiarEstadoAuth = (nuevoEstado) => {
    setAuth(nuevoEstado);
  };

  // Funcion para cambiar el estado de la habitacion que se reservara
  const cambiarRoom = (nuevoEstado) => {
    setRoom(nuevoEstado);
  };

  return (
    <AuthProvider>
      <Header auth={auth} cambiarEstadoAuth={cambiarEstadoAuth} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
        <Route
          path="/login"
          element={<Login cambiarEstadoAuth={cambiarEstadoAuth} />}
        />
        <Route path="/reseñas" element={<Reviews />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route
          path="/bed-rooms"
          element={<Bed auth={auth} cambiarRoom={cambiarRoom} />}
        />
        <Route path="/nosotros" element={<About />} />
        {/* rutas protegidas */}
        <Route element={<ProtegerRutas />}>
          <Route
            path="/reservar-habitacion"
            element={<Booking room={room} auth={auth} />}
          />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/reservas" element={<ReservasUser />} />

          <Route path="/admin-habitacion" element={<HabitacionAdmin />} />
        </Route>
      </Routes>
      {/* <Footer></Footer> */}
    </AuthProvider>
  );
}

export default App;
