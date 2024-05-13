import React, { ReactElement, useContext, useEffect } from "react";
import { createContext, useState } from "react";
import localforage from "localforage";
import {
  GlobeAmericasIcon,
  GlobeAsiaAustraliaIcon,
} from "@heroicons/react/24/outline";
import { Alert } from "../components/Alert";

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
  setIsLoading: (isLoading: boolean) => {},
  addNotification: (notification: Notification) => {},
  removeNotification: (notification: Notification) => {},
});

export type NotifyImage = {
  src: string;
  alt: string;
};

export type Notification = {
  id: number;
  title: string;
  message: string | ReactElement;
  type: string;
  image: NotifyImage | boolean;
};

export type Language = {
  name: string;
  icon;
  direction: string;
};

export const ContextProvider = ({ children }) => {
  const [token, _setToken] = useState({});
  const [languages, setLanguages] = useState<Language[]>([
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      (async () => {
        // ذخیره کردن داده
        await localforage.setItem("ACCESS_TOKEN", token); // بازیابی داده بر اساس کلید
      })();
    } else {
      (async () => {
        await localforage.removeItem("ACCESS_TOKEN");
      })();
    }
  };
  const setLanguage = (language) => {
    _setLanguage(language);
    if (language) {
      (async () => {
        // ذخیره کردن داده
        await localforage.setItem("language", language.name); // بازیابی داده بر اساس کلید
      })();
    } else {
      (async () => {
        await localforage.removeItem("language");
      })();
    }
  };

  const addNotification = (notification: Notification) => {
    const newNotification = notification;
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      newNotification,
    ]);
  };

  const removeNotification = (notification: Notification) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((item) => item.id !== notification.id)
    );
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
        isLoading,
        setIsLoading,
        addNotification,
        removeNotification,
        setUser,
        setToken,
        setPanel,
        setLanguage,
      }}
    >
      {children}
      <div
        className={"fixed bottom-10 left-5 w-full max-w-sm flex flex-col gap-4"}
      >
        {notifications &&
          notifications.map((notify, index) => (
            <Alert
              key={index}
              type={notify.type}
              title={notify.title}
              message={notify.message}
              image={notify.image}
            />
          ))}
      </div>
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
