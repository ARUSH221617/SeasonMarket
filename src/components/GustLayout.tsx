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
import { Alert, AlertBox } from "./Alert";
const GustLayout = () => {
  const { token, language } = useStateContext();
  // if (token) {
  // (async () => {
  //   await localforage.removeItem("ACCESS_TOKEN");
  // })();
  // return <Navigate to={"/dashboard"} />;
  // }
  return (
    <div
      className={language && language.direction}
      style={{ minHeight: "100vh" }}
    >
      {/* <AlertBox>
        <Alert type="success" message="Success alert" />
        <Alert type="error" message="Error alert" />
        <Alert
          type="warning"
          message="Warning alert"
          image={{ src: "user.png", alt: "" }}
        />
        <Alert type="info" message="Info alert" />
        <Alert type="fire" message="fire alert" />
      </AlertBox> */}
      <GustHeader />
      <Outlet />
      <Footer />
    </div>
  );
};
export default GustLayout;
