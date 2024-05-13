import React from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";

export default function Banner() {
    const [showBanner, setShowBanner] = React.useState(true);
  return showBanner && (
    <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-gradient-to-r from-[#FF6550] to-[#FF6C66] px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-sm leading-6 text-white">
          <strong className="font-semibold">ARUSH</strong>
          <svg
            viewBox="0 0 2 2"
            className="mx-2 inline h-0.5 w-0.5 fill-current fill-white"
            aria-hidden="true"
          >
            <circle cx={1} cy={1} r={1} />
          </svg>
          attention: information text from admin.
        </p>
        <a
          href="#"
          className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
        >
          Follow Me <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
      <div className="flex flex-1 justify-end">
        <button
          type="button"
          className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
          onClick={() => setShowBanner(false)}
        >
          <span className="sr-only">Dismiss</span>
          <XMarkIcon className="h-5 w-5 text-light" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
