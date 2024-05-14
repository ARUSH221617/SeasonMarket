import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
const FreeLayout = () => {
  const { token } = useStateContext();
  if (token) {
    return <Navigate to={"/dashboard"} />;
  }
  return (
    <div className="flex flex-col" style={{ minHeight: "100vh" }}>
      <Outlet />
    </div>
  );
};
export default FreeLayout;
