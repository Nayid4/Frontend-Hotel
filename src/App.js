import {React, useState} from "react";
import {Routes,Route} from 'react-router-dom';
import Header from "./Components/Header";
import Footer from "./Components/Footer";

//paginas import
import Home from "./Pages/Home";
import PropertyDetails from "./Pages/PropertyDetails";
import Registro from "./Pages/Registro";
import Reviews from "./Pages/Reviews";
import Booking from "./Pages/Booking";
import Bed from "./Pages/bed-rooms";
import Contact from "./Pages/Contact-us"
import About from "./Pages/About-us"
import Login from "./Pages/Login"
import Profile from "./Pages/Profile-user"
import BookingUser from "./Pages/Booking-user";

export default function App() {

  // Lista que contiene los titulos del header
  const ListaMenu = [
    {
      titulo:"NOSOTROS",
      path:"/about-us"
    },
    {
      titulo:"RESEÑAS",
      path:"/reviews"
    },
    {
      titulo:"HABITACIONES",
      path:"/bed-rooms"
    },
    {
      titulo:"CONTACTO",
      path:"/contact-us"
    }
  ];

  // Estado para saber si un usuario inicio sesion
  const [auth, setAuth] = useState({ 
    auth: false,
    userName: ""
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
    <div>
      <Header ListaMenu={ListaMenu} auth={auth} cambiarEstadoAuth={cambiarEstadoAuth}/> 
      <Routes> 
        <Route path='/' element ={<Home/>} />
        <Route path='/registro' element ={<Registro/>} />
        <Route path='/login' element ={<Login cambiarEstadoAuth={cambiarEstadoAuth}/>} />
        <Route path='/propiedades/:id' element={<PropertyDetails/>}/>
        <Route path='/reviews' element ={<Reviews/>} />
        <Route path='/contact-us' element ={<Contact/>} />
        <Route path='/bed-rooms' element ={<Bed auth={auth} cambiarRoom={cambiarRoom}/>} />
        <Route path='/booking' element ={<Booking room={room} auth={auth}/>} />
        <Route path='/about-us' element ={<About/>} />
        <Route path='/profile' element ={<Profile/>} />
        <Route path='/your-booking' element ={<BookingUser/>} />
      </Routes>
      <Footer/>
    </div>
  );
}
