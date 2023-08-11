const formatearFecha = (fecha) => {
  const fechaOriginal = new Date(fecha);
  const opciones = { year: "numeric", month: "long", day: "numeric" };
  const fechaFormateada = fechaOriginal.toLocaleDateString("en-US", opciones);
  return fechaFormateada;
};
function Habitacionuser({ habitacion }) {
  const fechaIngreso = formatearFecha(habitacion.reservas.fechaIngreso);
  const fechaSalida = formatearFecha(habitacion.reservas.fechaSalida);
  return (
    <div className="p-5 bg-[#191919] max-w-md  rounded-md m-5">
      <h1 className="text-2xl font-bold">{habitacion.reservas.habitacion}</h1>

      <p>fecha de ingreso : {fechaIngreso}</p>
      <p>fecha de salida : {fechaSalida}</p>
      <p>Precio: {habitacion.precio}</p>
      <div className="flex justify-center">
        <button
          type="button"
          class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 m-2" 
        >
          cancelar
        </button>
      </div>
    </div>
  );
}
export default Habitacionuser;
