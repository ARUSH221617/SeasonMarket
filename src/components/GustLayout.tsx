import React, { useEffect } from "react";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import Header from "./Header";

const GustLayout = () => {
  const { language, addNotification } = useStateContext();

  const dir = language ? language.direction : "ltr";

  return (
    <div className={`flex flex-col ${dir}`} style={{ minHeight: "100vh" }}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
export default GustLayout;
