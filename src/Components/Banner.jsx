import React from "react";
import imagen from "../assets/images/HotelWal.jpg";
import "../index.css";
const Banner = () => {
  return (
    <section className="h-full max-h-[640px] mb-8 x1:mb-24">
      <div className="flex flex-col lg:flex-row">
        <div className=" lg:ml-8 x1:m1-[135px] flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-1 px-4 lg:px-0">
          <h1 className="font-semibold leading-none mb-6">
            <span className="text-[#580EF6]">Reserva</span> Una Habitacion Pa Dormir Un Rato.
          </h1>
          <p className="max-w-[480px] mb-8">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga
            maiores consequuntur earum qui? Necessitatibus non reiciendis eum
            obcaecati inventore debitis.
          </p>
        </div>
        {/* imagen main */}
        <div className='hidden flex-1 lg:flex justify-end items-end'>
          <img className="hotel-main flex items-center rounded-full" src={imagen} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Banner;
