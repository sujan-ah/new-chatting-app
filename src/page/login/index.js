import React from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  return (
    <div>
      <div className="flex">
        <div className="w-1/2 flex flex-col items-end mt-36">
          <div className="w-[600px]">
            <h2 className="font-nunito font-bold text-4xl mr-[69px]">
              Login to your account!
            </h2>

            <div className="w-2/3">
              <button className="w-3/5 h-auto flex border px-8 py-5 rounded-lg mt-12 ">
                <FcGoogle className="text-2xl" />
                <p className="font-nunito font-bold text-blue text-sm ml-2.5 mt-[2px]">
                  Login with Google
                </p>
              </button>

              <div className="relative mt-14">
                <input
                  className="border-b border-solid border-purpal  w-full  py-7 border-opacity-30 font-nunito font-semibold text-2xl outline-0 text-blue"
                  type="email"
                />
                <p className="font-nunito font-semibold text-sm text-purpal absolute top-[-8px] opacity-90">
                  Email Address
                </p>
              </div>

              <div className="relative mt-14">
                <input
                  className="border-b border-solid border-purpal  w-full  py-7 border-opacity-30 font-nunito font-semibold text-2xl outline-0 text-blue"
                  type="password"
                />
                <p className="font-nunito font-semibold text-sm text-purpal absolute top-[-8px] opacity-90">
                  Password
                </p>
              </div>

              <button className="w-full h-auto bg-primary p-6 rounded-lg mt-12">
                <p className="font-nunito font-semibold text-white text-xl">
                  Login to Continue
                </p>
              </button>

              <p className="px-5 font-semibold  mt-9 text-blue">
                Don’t have an account ?
                <Link to="/registration" className="text-[#EA6C00] font-bold">
                  {" "}
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="w-1/2">
          <picture>
            <img
              className="h-screen w-full object-cover"
              src="/images/loginimg.webp"
              loading="lazy"
            />
          </picture>
        </div>
      </div>
    </div>
  );
};

export default Login;
