import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { FiEyeOff, FiEye } from "react-icons/fi";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Registration = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  let [email, setEmail] = useState("");
  let [name, setName] = useState("");
  let [password, setPassword] = useState("");
  let [emailerr, setEmailerr] = useState("");
  let [nameerr, setNameerr] = useState("");
  let [passworderr, setPassworderr] = useState("");
  let [eyeopen, setEyeopen] = useState(false);
  let [err, setErr] = useState(false);
  let [loader, setLoader] = useState(false);

  let handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailerr("");
    setErr("");
  };
  let handleName = (e) => {
    setName(e.target.value);
    setNameerr("");
  };
  let handlePassword = (e) => {
    setPassword(e.target.value);
    setPassworderr("");
  };

  let handleEye = () => {
    setEyeopen(!eyeopen);
  };

  let handleRegistration = () => {
    if (!email) {
      setEmailerr("Email is required");
    } else {
      if (
        !email
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      ) {
        setEmailerr("Please give valid email");
      }
    }
    if (!name) {
      setNameerr("Fullname is required");
    } else {
      if (name.length <= 2)
        setNameerr("Fullname must be more than 2 character");
    }
    if (!password) {
      setPassworderr("Password is required");
    } else if (!password.match(/^(?=.*[a-z])/)) {
      setPassworderr("Password must contain lowercase character");
    } else if (!password.match(/^(?=.*[A-Z])/)) {
      setPassworderr("Password must contain uppercase character");
    } else if (!password.match(/^(?=.*[0-9])/)) {
      setPassworderr("Password must contain numeric character");
    } else if (!password.match(/^(?=.*[!@#$%^&*])/)) {
      setPassworderr("Password must contain symbol");
    } else if (!password.match(/^(?=.{8,})/)) {
      setPassworderr("Password must be at least 8 character");
    }
    if (
      email &&
      password &&
      name &&
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      ) &&
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(
        password
      ) &&
      name.length > 2
    ) {
      setLoader(true);
      toast.success(
        "Registration Successfull. Please Varify Your Email Address"
      );
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: "images/profile.jpg",
          })
            .then(() => {
              console.log(user);

              sendEmailVerification(auth.currentUser).then(() => {
                setTimeout(() => {
                  setLoader(false);
                  navigate("/login");
                }, 2000);
              });
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode.includes("email")) {
            setErr("Email Already in Use");
            setLoader(false);
          }
        });
    }
  };

  return (
    <div>
      <div className="flex">
        <ToastContainer position="top-left" theme="dark" />
        <div className="sml:w-1/2 flex flex-col items-end md:mt-36 lg:mt-20 xl:mt-36 sml:pb-4 md:pb-0">
          <div className="xl:w-[600px] px-2.5 xl:px-0 mt-5 md:mt-0 mb-5 xl:mb-0">
            <h2 className="font-nunito font-bold text-4xl sml:text-xl md:!text-3xl lg:!text-4xl lg:mr-[69px] text-center sml:text-start">
              Get started with easily register
            </h2>
            <p className="font-nunito font-regular text-xl sml:text-base mt-3 text-purpal opacity-60 text-center sml:text-start">
              Free register and you can enjoy it
            </p>

            <div className="xl:w-2/3">
              {err && (
                <p className="bg-rose-600 rounded-lg px-4 py-3 mt-2 text-white font-nunito font-semibold text-lg">
                  {err}
                </p>
              )}
              <div className="relative mt-8 xl:mt-14">
                <input
                  className="border border-solid border-purpal rounded-lg w-full px-14 py-7 sml:py-4 sml:px-5 xl:!px-8 xl:!py-7 border-opacity-30 font-nunito font-semibold text-2xl outline-0"
                  type="email"
                  onChange={handleEmail}
                />
                <p className="font-nunito font-semibold text-sm text-purpal absolute top-[-8px] left-14 bg-white px-5 opacity-90 ">
                  Email Address
                </p>
              </div>
              {emailerr && (
                <p className="bg-rose-600 rounded-lg px-4 py-3 mt-2 text-white font-nunito font-semibold text-lg">
                  {emailerr}
                </p>
              )}

              <div className="relative mt-8 xl:mt-14">
                <input
                  className="border border-solid border-purpal rounded-lg w-full px-14 py-7 sml:py-4 sml:px-5 xl:!px-8 xl:!py-7 border-opacity-30 font-nunito font-semibold text-2xl outline-0"
                  type="text"
                  onChange={handleName}
                />
                <p className="font-nunito font-semibold text-sm text-purpal absolute top-[-8px] left-14 bg-white px-5 opacity-90">
                  Full name
                </p>
              </div>
              {nameerr && (
                <p className="bg-rose-600 rounded-lg px-4 py-3 mt-2 text-white font-nunito font-semibold text-lg">
                  {nameerr}
                </p>
              )}

              <div className="relative mt-8 xl:mt-14">
                <input
                  className="border border-solid border-purpal rounded-lg w-full px-14 py-7 sml:py-4 sml:px-5 xl:!px-8 xl:!py-7 border-opacity-30 font-nunito font-semibold text-2xl outline-0"
                  type={eyeopen ? "text" : "password"}
                  onChange={handlePassword}
                />
                <p className="font-nunito font-semibold text-sm text-purpal absolute top-[-8px] left-14 bg-white px-5 opacity-90">
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

              {passworderr && (
                <p className="bg-rose-600 rounded-lg px-4 py-3 mt-2 text-white font-nunito font-semibold text-lg">
                  {passworderr}
                </p>
              )}

              {loader ? (
                <div className="ml-40	mt-5">
                  <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="70"
                    visible={true}
                  />
                </div>
              ) : (
                <button
                  className="w-full h-auto bg-primary p-6 sml:p-4 rounded-full mt-8 xl:mt-12"
                  onClick={handleRegistration}
                >
                  <p className="font-nunito font-semibold text-white text-xl sml:text-base md:!text-xl">
                    Sign up
                  </p>
                </button>
              )}

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
