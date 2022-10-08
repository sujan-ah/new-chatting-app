import React from "react";
import { Link } from "react-router-dom";

const Registration = () => {
  return (
    <div>
      <div className="flex">
        <div className="w-1/2 flex flex-col items-end mt-36">
          <div className="w-[600px]">
            <h2 className="font-nunito font-bold text-4xl mr-[69px]">
              Get started with easily register
            </h2>
            <p className="font-nunito font-regular text-xl mt-3 text-purpal opacity-60">
              Free register and you can enjoy it
            </p>

            <div className="w-2/3">
              <div className="relative mt-14">
                <input
                  className="border border-solid border-purpal rounded-lg w-full px-14 py-7 border-opacity-30 font-nunito font-semibold text-2xl outline-0"
                  type="email"
                />
                <p className="font-nunito font-semibold text-sm text-purpal absolute top-[-8px] left-14 bg-white px-5 opacity-90 ">
                  Email Address
                </p>
              </div>

              <div className="relative mt-14">
                <input
                  className="border border-solid border-purpal rounded-lg w-full px-14 py-7 border-opacity-30 font-nunito font-semibold text-2xl outline-0"
                  type="text"
                />
                <p className="font-nunito font-semibold text-sm text-purpal absolute top-[-8px] left-14 bg-white px-5 opacity-90">
                  Full name
                </p>
              </div>

              <div className="relative mt-14">
                <input
                  className="border border-solid border-purpal rounded-lg w-full px-14 py-7 border-opacity-30 font-nunito font-semibold text-2xl outline-0"
                  type="password"
                />
                <p className="font-nunito font-semibold text-sm text-purpal absolute top-[-8px] left-14 bg-white px-5 opacity-90">
                  Password
                </p>
              </div>

              <button className="w-full h-auto bg-primary p-6 rounded-full mt-12">
                <p className="font-nunito font-semibold text-white text-xl">
                  Sign up
                </p>
              </button>

              <p className=" font-semibold text-center mt-9 text-blue">
                Already have an account ?
                <Link to="/login" className="text-[#EA6C00] font-bold">
                  {" "}
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="w-1/2">
          <picture>
            <img
              className="h-screen w-full object-cover"
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
