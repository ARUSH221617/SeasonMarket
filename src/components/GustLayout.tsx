import React from "react";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import GustHeader from "./GustHeader";
const GustLayout = () => {
  return (
    <div className="min-h-full flex-1" style={{minHeight: "100vh"}}>
      <GustHeader />
      <Outlet />
      <Footer />
    </div>
  );
};
export default GustLayout;
