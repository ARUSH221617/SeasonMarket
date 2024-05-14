import React, { ReactElement, useContext, useEffect } from "react";
import { createContext, useState } from "react";
import localforage from "localforage";
import {
  GlobeAmericasIcon,
  GlobeAsiaAustraliaIcon,
} from "@heroicons/react/24/outline";
import { Alert } from "../components/Alert";
import { Transition } from "@headlessui/react";

localforage.config({
  driver: localforage.LOCALSTORAGE, // درایور مورد نیاز را انتخاب کنید
  name: "arush", // نام دیتابیس
  version: 1.0, // نسخه دیتابیس
  storeName: "user", // نام استور
  description: "test database for login", // توضیحات دیتابیس
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

const StateContext = createContext({
  panel: {},
  user: {},
  token: null,
  languages: Array<Language>,
  language: {},
  setToken: (token: string) => {},
  setUser: (user) => {},
  setPanel: (panel) => {},
  setLanguage: (language: string) => {},
  setIsLoading: (isLoading: boolean) => {},
  addNotification: (notification: Notification) => {},
  removeNotification: (notification: Notification) => {},
});

export const ContextProvider = ({ children }) => {
  const [token, _setToken] = useState(null);
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
    (async () => {
      const token = await localforage.getItem("ACCESS_TOKEN");
      setToken(token);
    })();
  }, []);

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
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 5000);
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
      <Transition
        show={isLoading}
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="flex justify-center items-center fixed min-h-dvh w-full top-0 left-0 bg-gradient-to-r from-secondary to-primary text-white">
          <div className="flex flex-col flex-1 items-center justify-center gap-6">
            <svg
              width="182"
              height="119"
              viewBox="0 0 182 119"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M92 29.8C92 29.2478 92.4477 28.8 93 28.8H181C181.552 28.8 182 29.2478 182 29.8V54.6C182 55.1523 181.552 55.6 181 55.6H119.8C119.248 55.6 118.8 56.0478 118.8 56.6V117.8C118.8 118.352 118.352 118.8 117.8 118.8H93C92.4477 118.8 92 118.352 92 117.8V29.8Z"
                fill="url(#paint0_linear_220_340)"
              />
              <path
                d="M90 30C90 29.4477 89.5523 29 89 29H1C0.447715 29 0 29.4477 0 30V54.8C0 55.3523 0.447714 55.8 0.999999 55.8H62.2C62.7523 55.8 63.2 56.2477 63.2 56.8V118C63.2 118.552 63.6477 119 64.2 119H89C89.5523 119 90 118.552 90 118V30Z"
                fill="url(#paint1_linear_220_340)"
              />
              <path
                d="M0 1C0 0.447716 0.447715 0 1 0L162 0C173.046 0 182 8.95431 182 20V25.8C182 26.3523 181.552 26.8 181 26.8L0.999995 26.8C0.44771 26.8 0 26.3523 0 25.8L0 1Z"
                fill="url(#paint2_linear_220_340)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_220_340"
                  x1="92"
                  y1="28.8"
                  x2="182"
                  y2="118.8"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FFF" />
                  <stop offset="1" stopColor="#F1F1F1F1" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_220_340"
                  x1="90"
                  y1="29"
                  x2="0"
                  y2="119"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FFF" />
                  <stop offset="1" stopColor="#F1F1F1F1" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_220_340"
                  x1="0"
                  y1="0"
                  x2="145.411"
                  y2="87.5623"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FFF" />
                  <stop offset="1" stopColor="#F1F1F1F1" />
                </linearGradient>
              </defs>
            </svg>
            <div
              className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        </div>
      </Transition>
      {!isLoading && children}
      <div
        className={
          "fixed min-sm:bottom-10 max-sm:top-5 left-5 max-sm:px-2 max-sm:left-0 w-full max-w-sm flex flex-col gap-4"
        }
      >
        {notifications &&
          notifications.map((notify, index) => (
            <Alert
              key={index}
              nid={notify.id}
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
