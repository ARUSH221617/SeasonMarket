import React, { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import localforage from "localforage";

localforage.config({
  driver: localforage.INDEXEDDB, // درایور مورد نیاز را انتخاب کنید
  name: "arush", // نام دیتابیس
  version: 1.0, // نسخه دیتابیس
  storeName: "user", // نام استور
  description: "test database for login", // توضیحات دیتابیس
});

const StateContext = createContext({
  panelInfo: null,
  user: {},
  token: localStorage.getItem("ACCESS_TOKEN"),
  setToken: (token) => {},
  setUser: (user) => {},
});

export const ContextProvider = ({ children }) => {
  const [token, _setToken] = useState(
    localforage.getItem("ACCESS_TOKEN").then((res) => {
      return res;
    })
  );
  const [user, setUser] = useState(async () => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
      });
      const data = await response.json();
      if (data.ok) {
        setToken(data.data.token);
        setUser(data.data.user);
      }
    } catch (error) {
      console.error("server error: ", error);
    }
  });

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      (async () => {
        // ذخیره کردن داده
        await localforage.setItem("ACCESS_TOKEN", token); // بازیابی داده بر اساس کلید
      })();
      //   localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      (async () => {
        await localforage.removeItem("ACCESS_TOKEN");
      })();
      //   localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  return (
    <StateContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
