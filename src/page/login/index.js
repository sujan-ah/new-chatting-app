import React from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  return (
    <div>
      <div className="flex">
        <div className="sml:w-1/2 flex flex-col items-end md:mt-36 lg:mt-20 xl:mt-36 sml:pb-4 md:pb-0">
          <div className="xl:w-[600px] px-2.5 xl:px-0 mt-5 md:mt-0 mb-5 xl:mb-0">
            <h2 className="font-nunito font-bold text-4xl sml:text-xl md:!text-3xl lg:!text-4xl lg:mr-[69px] text-center sml:text-start">
              Login to your account!
            </h2>

            <div className="xl:w-2/3">
              <button className="xl:w-3/5 h-auto flex border px-8 py-5 rounded-lg xl:mt-10 mt-5  ml-auto mr-auto sml:ml-0 sml:mr-0">
                <FcGoogle className="text-2xl" />
                <p className="font-nunito font-bold text-blue text-sm ml-2.5 mt-[2px]">
                  Login with Google
                </p>
              </button>

              <div className="relative mt-14">
                <input
                  className="border-b border-solid border-purpal w-full px-14 py-7 sml:py-4 sml:px-5 xl:!px-14 xl:!py-7 border-opacity-30 font-nunito font-semibold text-2xl outline-0"
                  type="email"
                />
                <p className="font-nunito font-semibold text-sm text-purpal absolute top-[-8px]  bg-white opacity-90 ">
                  Email Address
                </p>
              </div>

              <div className="relative mt-14">
                <input className="border-b border-solid border-purpal w-full px-14 py-7 sml:py-4 sml:px-5 xl:!px-14 xl:!py-7 border-opacity-30 font-nunito font-semibold text-2xl outline-0" />
                <p className="font-nunito font-semibold text-sm text-purpal absolute top-[-8px] bg-white  opacity-90">
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

        <div className="sml:w-1/2 hidden sml:block">
          <picture>
            <img
              className="md:!h-screen  sml:h-full w-full object-cover"
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
