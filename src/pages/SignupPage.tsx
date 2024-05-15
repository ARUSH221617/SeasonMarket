import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import persianTramPLus from "/public/persianTramPLus.svg";
import SVG3dUserComputer from "/public/3d-user-computer.svg";

export default function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    full_name: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { setToken, setUser, addNotification } = useStateContext();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (data.ok) {
        setToken(data.data.token);
        setUser(data.data.user);
        addNotification({
          id: Date.now(),
          title: "",
          message: `Welcome Back ${data.data.display_name}`,
          type: "success",
          image: false,
        });
        navigate("/dashboard");
      } else {
        if (data.message == "invalid data") {
          if (data.data.email) {
            addNotification({
              id: 11,
              title: "",
              message: data.data.email[0],
              type: "error",
              image: false,
            });
          }
          if (data.data.username) {
            addNotification({
              id: 11,
              title: "",
              message: data.data.username[0],
              type: "error",
              image: false,
            });
          }
          if (data.data.full_name) {
            addNotification({
              id: 11,
              title: "",
              message: data.data.full_name[0],
              type: "error",
              image: false,
            });
          }
        } else {
          addNotification({
            id: Date.now(),
            title: "",
            message: data.message,
            type: "error",
            image: false,
          });
        }
      }
    } catch (error) {
      console.error("server error: ", error);
      addNotification({
        id: Date.now(),
        title: "Server Error",
        message: error.message,
        type: "error",
        image: false,
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-full flex-1 flex-row max-md:flex-col">
      <div className="flex w-full overflow-hidden min-h-full flex-1 flex-col justify-center px-6 py-12 max-md:px-2 max-md:py-6 lg:px-8 relative">
        <Link
          to={"/"}
          className="absolute max-md:relative max-md:flex max-md:items-center max-md:justify-center top-5 left-5 max-md:inset-0"
        >
          <img
            className="mx-auto h-28 w-auto max-md:h-38"
            src={persianTramPLus}
            alt="ARUSH"
          />
        </Link>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-start text-[30px] font-[Poppins] font-medium leading-9 tracking-tight text-gray-900">
            Sign Up
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={submit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900 sr-only"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                onChange={handleInputChange}
                placeholder="Enter Username"
                className="block w-full rounded-lg border-0 py-4 px-6 text-secondary bg-secondary-75 text-[15px] placeholder:font-light placeholder:font-Poppins font-Poppins placeholder:text-secondary focus:ring-2 focus:ring-inset focus:ring-secondary"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900 sr-only"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="text"
                autoComplete="email"
                required
                onChange={handleInputChange}
                placeholder="Enter Email"
                className="block w-full rounded-lg border-0 py-4 px-6 text-secondary bg-secondary-75 text-[15px] placeholder:font-light placeholder:font-Poppins font-Poppins placeholder:text-secondary focus:ring-2 focus:ring-inset focus:ring-secondary"
              />
            </div>
            <div>
              <label
                htmlFor="full_name"
                className="block text-sm font-medium leading-6 text-gray-900 sr-only"
              >
                Full Name
              </label>
              <input
                id="full_name"
                name="full_name"
                type="text"
                autoComplete="full_name"
                required
                onChange={handleInputChange}
                placeholder="Enter Full Name"
                className="block w-full rounded-lg border-0 py-4 px-6 text-secondary bg-secondary-75 text-[15px] placeholder:font-light placeholder:font-Poppins font-Poppins placeholder:text-secondary focus:ring-2 focus:ring-inset focus:ring-secondary"
              />
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary shadow-2xl shadow-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div
                      className="inline-block mr-2 h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                      role="status"
                    >
                      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                      </span>
                    </div>
                    <span>Be Paint...</span>
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            a member?{" "}
            <Link
              to={"/login"}
              className="font-semibold leading-6 text-secondary hover:text-secondary-800"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
      <div className="max-md:hidden flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="bg-gradient-to-r to-primary from-secondary min-h-full rounded-2xl relative">
          <div className="absolute top-5 right-5">
            <span
              className="text-white flex flex-row gap-2 items-center font-[Poppins]"
              style={{ fontSize: "15px" }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_152_16479)">
                  <path
                    d="M13.619 10.2746L11.6652 8.32085C10.9675 7.62308 9.78126 7.90222 9.50215 8.80928C9.29282 9.4373 8.59506 9.78618 7.96707 9.6466C6.57154 9.29772 4.68757 7.48353 4.33869 6.01822C4.12936 5.39021 4.54802 4.69244 5.17601 4.48314C6.0831 4.20403 6.36221 3.01783 5.66445 2.32007L3.7107 0.366327C3.15249 -0.122109 2.31518 -0.122109 1.82674 0.366327L0.500987 1.69208C-0.824766 3.08761 0.64054 6.78576 3.92003 10.0653C7.19953 13.3448 10.8977 14.8799 12.2932 13.4843L13.619 12.1586C14.1074 11.6003 14.1074 10.763 13.619 10.2746Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_152_16479">
                    <rect width="14" height="14" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              +98 937 688 4541
            </span>
          </div>
          <div className="m-full h-full flex flex-col flex-1 items-center justify-center">
            <object data={SVG3dUserComputer} type=""></object>
            <div className="text-white w-full px-10 py-4">
              <h2
                className="font-[Poppins] font-semibold"
                style={{ fontSize: "40px" }}
              >
                Sign in to name
              </h2>
              <h2
                className="font-[Poppins] font-light"
                style={{ fontSize: "20px" }}
              >
                Sign in to name
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
