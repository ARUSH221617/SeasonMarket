import React, { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import localforage from "localforage";
import {
  GlobeAltIcon,
  GlobeAmericasIcon,
  GlobeAsiaAustraliaIcon,
} from "@heroicons/react/24/outline";

localforage.config({
  driver: localforage.LOCALSTORAGE, // درایور مورد نیاز را انتخاب کنید
  name: "arush", // نام دیتابیس
  version: 1.0, // نسخه دیتابیس
  storeName: "user", // نام استور
  description: "test database for login", // توضیحات دیتابیس
});

const StateContext = createContext({
  panel: {},
  user: {},
  token: {},
  languages: [],
  language: {},
  setToken: (token: string) => {},
  setUser: (user) => {},
  setPanel: (panel) => {},
  setLanguage: (language: string) => {},
});

export const ContextProvider = ({ children }) => {
  const [token, _setToken] = useState({});
  const [languages, setLanguages] = useState([
    {
      name: "English",
      icon: GlobeAmericasIcon,
      direction: "ltr",
    },
    {
      name: "فارسی",
      icon: GlobeAsiaAustraliaIcon,
      direction: "rtl",
    },
  ]);
  const [language, _setLanguage] = useState({});
  const [user, setUser] = useState({});
  const [panel, setPanel] = useState({});

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
  const setLanguage = (language) => {
    _setLanguage(language);
    if (language) {
      (async () => {
        // ذخیره کردن داده
        await localforage.setItem("language", language.name); // بازیابی داده بر اساس کلید
      })();
      //   localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      (async () => {
        await localforage.removeItem("language");
      })();
      //   localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        const token = await localforage.getItem("ACCESS_TOKEN");
        if (token) {
          setToken(token);
          const response = await fetch("/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: token }),
          });
          const data = await response.json();
          if (data.ok) {
            setUser(data.data.user);
          }
        }
      } catch (error) {
        console.error("Initialization error: ", error);
      }
    };
    initialize();
  }, []);

  // useEffect(() => {
  //   const initializeLanguages = async () => {
  //     setLanguage([
  //       {
  //         name: "English",
  //         icon: GlobeAltIcon,
  //         direction: "ltr",
  //       },
  //       {
  //         name: "Persian",
  //         icon: GlobeAltIcon,
  //         direction: "rtl",
  //       },
  //     ]);
  //   };
  //   initializeLanguages();
  // }, []);

  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        const languageName =
          (await localforage.getItem("language")) ?? "English";
        if (languageName) {
          // Find the language object with the matching name
          const foundLanguage = languages.find(
            (item) => item.name === languageName
          );
          if (foundLanguage) {
            setLanguage(foundLanguage);
          }
        }
      } catch (error) {
        console.error("Language initialization error: ", error);
      }
    };
    initializeLanguage();
  }, []);

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        panel,
        language,
        languages,
        setUser,
        setToken,
        setPanel,
        setLanguage,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
