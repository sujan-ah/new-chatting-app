import React from "react";
import { Link } from "react-router-dom";

const Registration = () => {
  return (
    <div>
      <div className="flex">
        <div className="sml:w-1/2 flex flex-col items-end md:mt-36 lg:mt-20 xl:mt-36 sml:pb-4 md:pb-0">
          <div className="xl:w-[600px] px-2.5 xl:px-0 mt-5 md:mt-0 mb-5 xl:mb-0">
            <h2 className="font-nunito font-bold text-4xl sml:text-xl md:!text-3xl lg:!text-4xl lg:mr-[69px] text-center sml:text-start">
              Get started with easily register
            </h2>
            <p className="font-nunito font-regular text-xl sml:text-base mt-3 text-purpal opacity-60 text-center sml:text-start">
              Free register and you can enjoy it
            </p>

            <div className="xl:w-2/3">
              <div className="relative mt-8 xl:mt-14">
                <input
                  className="border border-solid border-purpal rounded-lg w-full px-14 py-7 sml:py-4 sml:px-5 xl:!px-8 xl:!py-7 border-opacity-30 font-nunito font-semibold text-2xl outline-0"
                  type="email"
                />
                <p className="font-nunito font-semibold text-sm text-purpal absolute top-[-8px] left-14 bg-white px-5 opacity-90 ">
                  Email Address
                </p>
              </div>

              <div className="relative mt-8 xl:mt-14">
                <input
                  className="border border-solid border-purpal rounded-lg w-full px-14 py-7 sml:py-4 sml:px-5 xl:!px-8 xl:!py-7 border-opacity-30 font-nunito font-semibold text-2xl outline-0"
                  type="text"
                />
                <p className="font-nunito font-semibold text-sm text-purpal absolute top-[-8px] left-14 bg-white px-5 opacity-90">
                  Full name
                </p>
              </div>

              <div className="relative mt-8 xl:mt-14">
                <input
                  className="border border-solid border-purpal rounded-lg w-full px-14 py-7 sml:py-4 sml:px-5 xl:!px-8 xl:!py-7 border-opacity-30 font-nunito font-semibold text-2xl outline-0"
                  type="password"
                />
                <p className="font-nunito font-semibold text-sm text-purpal absolute top-[-8px] left-14 bg-white px-5 opacity-90">
                  Password
                </p>
              </div>

              <button className="w-full h-auto bg-primary p-6 sml:p-4 rounded-full mt-8 xl:mt-12">
                <p className="font-nunito font-semibold text-white text-xl sml:text-base md:!text-xl">
                  Sign up
                </p>
              </button>

              <p className=" font-semibold text-center mt-5 xl:mt-9 text-blue text-sm lg:text-base">
                Already have an account ?
                <Link to="/login" className="text-[#EA6C00] font-bold">
                  {" "}
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="sml:w-1/2 hidden sml:block">
          <picture>
            <img
              className="md:!h-screen  sml:h-full w-full object-cover"
              src="/images/registratiomimg.webp"
              loading="lazy"
            />
          </picture>
        </div>
      </div>
    </div>
  );
};

export default Registration;
