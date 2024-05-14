import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { Transition } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { useStateContext } from "../contexts/ContextProvider";
const types = {
  success: {
    text: "text-gray",
    bg: "bg-[#E5FAF5] border-s-2 rounded-md rounded-ss-none  rounded-es-none border-[#00CC99]",
    icon: (
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
        <svg
          width="134"
          height="134"
          viewBox="0 0 134 134"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          <circle cx="67" cy="67" r="67" fill="url(#paint0_linear_148_218)" />
          <path
            d="M60.0832 79.2629L94.1702 45.1721L99.4175 50.4157L60.0832 89.75L36.4834 66.1502L41.727 60.9066L60.0832 79.2629Z"
            fill="white"
          />
          <defs>
            <linearGradient
              id="paint0_linear_148_218"
              x1="67"
              y1="0"
              x2="67"
              y2="134"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.0416667" stopColor="#18EDB8" />
              <stop offset="0.453125" stopColor="#4DEAC2" />
              <stop offset="0.9997" stopColor="#00CC99" />
              <stop offset="0.9998" stopColor="#00B789" />
              <stop offset="0.9999" stopColor="#00CC99" />
              <stop offset="1" stopColor="#00C493" />
            </linearGradient>
          </defs>
        </svg>
        <span className="sr-only">Check icon</span>
      </div>
    ),
  },
  error: {
    text: "text-gray",
    bg: "bg-[#FDEEEE] border-s-2 rounded-md rounded-ss-none  rounded-es-none border-[#EB5757]",
    icon: (
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8">
        <svg
          width="134"
          height="134"
          viewBox="0 0 134 134"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <circle cx="67" cy="67" r="67" fill="#EB5757" />
          <path
            d="M67.5 62.2564L85.8562 43.9001L91.0998 49.1437L72.7436 67.5L91.0998 85.8562L85.8562 91.0998L67.5 72.7435L49.1437 91.0998L43.9001 85.8562L62.2564 67.5L43.9001 49.1437L49.1437 43.9001L67.5 62.2564Z"
            fill="white"
          />
        </svg>
        <span className="sr-only">Error icon</span>
      </div>
    ),
  },
  warning: {
    text: "text-gray",
    bg: "bg-[#FDF8E8] border-s-2 rounded-md rounded-ss-none  rounded-es-none border-[#F2C94C]",
    icon: (
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
        <svg
          width="134"
          height="134"
          viewBox="0 0 134 134"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <circle cx="67" cy="67" r="67" fill="#F2C94C" />
          <path
            d="M62 82.3334H72.3333V92.6667H62V82.3334ZM62 41H72.3333V72H62V41Z"
            fill="white"
          />
        </svg>
        <span className="sr-only">Warning icon</span>
      </div>
    ),
  },
  info: {
    text: "text-gray",
    bg: "bg-[#EEEEFE] border-s-2 rounded-md rounded-ss-none  rounded-es-none border-[#5458F7]",
    icon: (
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-700 dark:text-blue-200">
        <svg
          width="134"
          height="134"
          viewBox="0 0 134 134"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <circle cx="67" cy="67" r="67" fill="#5458F7" />
          <path
            d="M62 51.6666H72.3333V41.3333H62V51.6666ZM62 92.9999H72.3333V61.9999H62V92.9999Z"
            fill="white"
          />
        </svg>
        <span className="sr-only">Info icon</span>
      </div>
    ),
  },
  default: {
    text: "text-gray",
    bg: "bg-[#FFF] border-s-2 rounded-md rounded-ss-none  rounded-es-none border-[#F1F1F1]",
    icon: (
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-700 dark:text-blue-200">
        {/* <QuestionMarkCircleIcon /> */}
        <span className="sr-only">Default icon</span>
      </div>
    ),
    iconColor: "text-purple",
  },
  quiz: {
    text: "text-gray",
    bg: "bg-gray-50 border-s-2 rounded-md rounded-ss-none  rounded-es-none border-gray-200",
    icon: (
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-700 dark:text-blue-200">
        <QuestionMarkCircleIcon />
        <span className="sr-only">Quiz icon</span>
      </div>
    ),
    iconColor: "text-light",
  },
  fire: {
    text: "text-gray",
    bg: "bg-purple-50 border-s-2 rounded-md rounded-ss-none  rounded-es-none border-purple",
    icon: (
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z"
          />
        </svg>
        <span className="sr-only">Fire icon</span>
      </div>
    ),
    iconColor: "text-light",
  },
};
export const Alert = ({ nid, type = "default", title, message, image }) => {
  const [showAlert, setShowAlert] = useState(true);
  const [showAlertTime, setShowAlertTime] = useState(4500);
  const { removeNotification } = useStateContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
      removeNotification({
        id: nid,
        title: title,
        message: message,
        type: type,
        image: image,
      });
    }, showAlertTime);
    return () => clearTimeout(timer);
  }, [showAlertTime]);

  return (
    <Transition
      show={showAlert}
      enter="transition ease-in-out duration-1000"
      enterFrom="-translate-x-full"
      enterTo="translate-x-0"
      leave="transition ease-in-out duration-1000"
      leaveFrom="translate-x-0"
      leaveTo="-translate-x-full"
    >
      <div
        className={`flex flex-row items-center gap-3 shadow w-full p-4 max-sm:p-2 max-sm:gap-2 ${types[type].text} ${types[type].bg} ${types[type].divide}`}
        onMouseOver={() => setShowAlertTime(4500)}
        role="alert"
      >
        {image && image.src && (
          <div>
            <img
              src={image.src}
              alt={image.alt && image.alt}
              className={`h-8 w-8 ${types[type].iconColor}`}
            />
          </div>
        )}
        {!image.src && types[type].icon}
        {(title || message) && (
          <div className="flex flex-col justify-center h-full">
            {title && (
              <h2 className="text-md font-bold text-gray-dark">{title}</h2>
            )}
            {message && (
              <p
                className={`${title && "ps-2"} text-sm font-normal`}
                dangerouslySetInnerHTML={{ __html: message }}
              />
            )}
          </div>
        )}
        <button
          type="button"
          className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          data-dismiss-target="#toast-success"
          aria-label="Close"
          onClick={() => setShowAlert(false)}
        >
          <span className="sr-only">Close</span>
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
    </Transition>
  );
};
