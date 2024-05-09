import React from "react";
import Footer from "./Footer";
import { Navigate, Outlet } from "react-router-dom";
import GustHeader from "./GustHeader";
import { useStateContext } from "../contexts/ContextProvider";
import localforage from "localforage";
localforage.config({
  driver: localforage.INDEXEDDB, // درایور مورد نیاز را انتخاب کنید
  name: "arush", // نام دیتابیس
  version: 1.0, // نسخه دیتابیس
  storeName: "user", // نام استور
  description: "test database for login", // توضیحات دیتابیس
});
const GustLayout = () => {
  const { token } = useStateContext();
  if (token) {
    // (async () => {
    //   await localforage.removeItem("ACCESS_TOKEN");
    // })();
    return <Navigate to={"/dashboard"} />;
  }
  return (
    <div style={{ minHeight: "100vh" }}>
      <GustHeader />
      <Outlet />
      <Footer />
    </div>
  );
};
export default GustLayout;
