import { Popover } from "@headlessui/react";
import { Link } from "react-router-dom";

export default function GustHeader() {
  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to={"/"} className="-m-1.5 p-1.5">
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </Link>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Link
            to={"/"}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Home
          </Link>

          <Link
            to={"/about"}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            About
          </Link>

          <Link
            to={"/contact"}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Contact
          </Link>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            to={"/login"}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
