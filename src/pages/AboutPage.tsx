import React from "react";
import SVGProgrammer from "/public/male-programmer-upper-body-svgrepo-com.svg";

const AboutPage = (props) => {
  return (
    <div className="flex-1 min-h-full flex">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
        <div className="text-center bg-gradient-to-r from-primary to-secondary py-1-5 px-3 h-[60vh] w-full rounded-lg shadow-md flex flex-1 flex-col justify-center">
          <div className="flex justify-center">
            <object data={SVGProgrammer} type="" className="w-60 h-60"></object>
          </div>
          <h1 className="text-white text-[48px] font-bold font-Poppins">
            About Me
          </h1>
          <p className="text-gray-100 font-[16px]">
            I am <strong>Amirreza Uneszadeh Shirazi</strong>. I start
            Programming in 10 years old. I start programming with python.
          </p>
        </div>
      </div>
    </div>
  );
};
export default AboutPage;
