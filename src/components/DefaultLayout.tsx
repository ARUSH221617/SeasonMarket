import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
const DefaultLayout = () => {
  const {user, token} = useStateContext();
  if (!token) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="min-h-full flex-1" style={{minHeight: "100vh"}}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
export default DefaultLayout;
