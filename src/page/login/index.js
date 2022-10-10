import { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FiEyeOff, FiEye } from "react-icons/fi";

const Login = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [emailErr, setEmailErr] = useState("");
  let [passwordErr, setPasswordErr] = useState("");
  let [eyeopen, setEyeopen] = useState(false);

  let handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailErr("");
  };
  let handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordErr("");
  };

  let handleEye = () => {
    setEyeopen(!eyeopen);
  };

  let handleLogin = () => {
    if (!email) {
      setEmailErr("Email is required");
    } else {
      if (
        !email
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      ) {
        setEmailErr("Please give a valid email");
      }
    }
    if (!password) {
      setPasswordErr("Password is required");
    } else if (!password.match(/^(?=.*[a-z])/)) {
      setPasswordErr("Password must contain lowercase");
    } else if (!password.match(/^(?=.*[A-Z])/)) {
      setPasswordErr("Password must contain uppercase");
    } else if (!password.match(/^(?=.*[0-9])/)) {
      setPasswordErr("Password must contain numeric ");
    } else if (!password.match(/^(?=.*[!@#$%^&*])/)) {
      setPasswordErr("Password must contain symbol");
    } else if (!password.match(/^(?=.{8,})/)) {
      setPasswordErr("Password must be 8 character");
    }
  };

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
                  className="border-b border-solid border-purpal w-full  py-7 sml:py-4 xl:!py-7 border-opacity-30 font-nunito font-semibold text-2xl outline-0"
                  type="email"
                  onChange={handleEmail}
                />
                <p className="font-nunito font-semibold text-sm text-purpal absolute top-[-8px]  bg-white opacity-90 ">
                  Email Address
                </p>
              </div>
              {emailErr && (
                <p className="bg-rose-600 px-4 py-4 rounded-lg mt-2 text-white font-nunito font-semibold text-xl">
                  {emailErr}
                </p>
              )}

              <div className="relative mt-14">
                <input
                  className="border-b border-solid border-purpal w-full  py-7 sml:py-4  xl:!py-7 border-opacity-30 font-nunito font-semibold text-2xl outline-0"
                  type={eyeopen ? "text" : "password"}
                  onChange={handlePassword}
                />
                <p className="font-nunito font-semibold text-sm text-purpal absolute top-[-8px] bg-white  opacity-90">
                  Password
                </p>

                {eyeopen ? (
                  <FiEye
                    onClick={handleEye}
                    className="absolute top-9 right-6 sml:top-7 xl:!top-9"
                  />
                ) : (
                  <FiEyeOff
                    onClick={handleEye}
                    className="absolute top-9 right-6 sml:top-7 xl:!top-9"
                  />
                )}
              </div>

              {passwordErr && (
                <p className="bg-rose-600 px-4 py-4 rounded-lg mt-2 text-white font-nunito font-semibold text-xl">
                  {passwordErr}
                </p>
              )}

              <button
                className="w-full h-auto bg-primary p-6 rounded-lg mt-12"
                onClick={handleLogin}
              >
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
