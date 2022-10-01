import React from "react";
import Carousel from "./Carousel";

const Banner = () => {
  return (
    <div className="container w-screen text-center	 h-400 flex-col pt-10 ">
      <h2 className=" text-[#ffffff] text-center	flex flex-col items-center justify-center text-[50px] mb-15 font-montserrat font-bold">
        Crypto Tracker
      </h2>
      <p className=" text-[#7d84bd] text-center	h-[40%] flex flex-col items-center  justify-center text-[16px] mb-15 font-montserrat ">
        Get all the Info regarding your favourite Crypto Currency
      </p>

      <Carousel />
    </div>
  );
};

export default Banner;
