import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { AiTwotoneEye } from "react-icons/ai";
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
import { getDatabase, ref, set } from "firebase/database";
import { useSelector } from "react-redux";

const Registration = () => {
  let data2 = useSelector((state) => state.darkmood.value2);
  const db = getDatabase();
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

      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: "images/profile.jpg",
          })
            .then(() => {
              console.log(user.user.displayName);

              sendEmailVerification(auth.currentUser)
                .then(() => {
                  toast.success(
                    "Registration Successfull. Please Varify Your Email Address"
                  );
                })
                .then(() => {
                  set(ref(db, "users/" + user.user.uid), {
                    username: user.user.displayName,
                    email: user.user.email,
                    profile_picture: user.user.photoURL,
                  })
                    .then(() => {
                      setTimeout(() => {
                        setLoader(false);
                        navigate("/login");
                      }, 2000);
                    })
                    .catch((error) => {
                      console.log(error);
                    });
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
        <ToastContainer position="top-left" theme={data2 ? "light" : "dark"} />
        <div className="sml:w-1/2 lg:w-1/2 xl:w-1/2 flex flex-col items-end mt-6 extsm:mt-[3px] sm:!mt-10 md:!mt-36 lg:!mt-32 xl:mt-36 sm:ml-3 md:ml-0 lg:ml-0 xl:ml-0 sml:pb-4 md:pb-0 p-5 sm:p-0 md:p-5 xl:p-0">
          <div className=" sm:w-[350px] lg:w-[470px] xl:w-[600px] px-2.5 xl:px-0 mt-5 md:mt-0 mb-7 xl:mb-0">
            <h2 className="font-nunito font-bold text-4xl sm:text-3xl sml:text-xl md:!text-4xl lg:!text-4xl xl:!text-4xl lg:mr-[69px] text-start sml:text-start lg:text-start">
              Get started with easily register
            </h2>
            <p
              className={
                data2
                  ? "font-nunito font-regular text-xl sm:text-sm sml:text-base md:text-xl mt-3 md:mt-5 text-white opacity-60 text-start lg:text-start xl:text-start sml:text-start"
                  : "font-nunito font-regular text-xl sm:text-sm xl:text-start sml:text-base md:text-xl mt-3 md:mt-5 text-purpal opacity-60 text-start lg:text-start sml:text-start"
              }
            >
              Free register and you can enjoy it
            </p>

            <div className="xl:w-2/3">
              {err && (
                <p className="bg-rose-600 rounded-lg px-4 py-3 mt-2 text-white font-nunito font-semibold text-lg">
                  {err}
                </p>
              )}
              <div className="relative mt-12 md:mt-14">
                <input
                  className={
                    data2
                      ? "border border-solid border-white rounded-lg w-full px-5 py-4 sm:py-3 sml:py-4 md:py-5 sm:px-5 sml:px-5 xl:!px-8 xl:!py-7 border-opacity-30 font-nunito font-semibold text-2xl outline-0 text-white bg-black"
                      : "border border-solid border-purpal rounded-lg w-full px-5 py-4 sm:py-3 sml:py-4 md:py-5 sm:px-5 sml:px-5 xl:!px-8 xl:!py-7 border-opacity-30 font-nunito font-semibold text-2xl outline-0"
                  }
                  type="email"
                  onChange={handleEmail}
                />
                <p
                  className={
                    data2
                      ? "font-nunito font-semibold text-sm text-white absolute top-[-8px] left-14 bg-black px-5 opacity-90"
                      : "font-nunito font-semibold text-sm text-purpal absolute top-[-8px] left-14 bg-white px-5 opacity-90"
                  }
                >
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
                  className={
                    data2
                      ? "border border-solid border-white rounded-lg w-full px-5 py-4 sm:py-3 sml:py-4 md:py-5 sm:px-5 sml:px-5 xl:!px-8 xl:!py-7 border-opacity-30 font-nunito font-semibold text-2xl outline-0 text-white bg-black"
                      : "border border-solid border-purpal rounded-lg w-full px-5 py-4 sm:py-3 sm:px-5 sml:py-4 md:py-5 sml:px-5 xl:!px-8 xl:!py-7 border-opacity-30 font-nunito font-semibold text-2xl outline-0"
                  }
                  type="text"
                  onChange={handleName}
                />
                <p
                  className={
                    data2
                      ? "font-nunito font-semibold text-sm text-white absolute top-[-8px] left-14 bg-black px-5 opacity-90"
                      : "font-nunito font-semibold text-sm text-purpal absolute top-[-8px] left-14 bg-white px-5 opacity-90"
                  }
                >
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
                  className={
                    data2
                      ? "border border-solid border-white rounded-lg w-full px-5 py-4 sm:py-3 sml:py-4 md:py-5 sm:px-5 sml:px-5 xl:!px-8 xl:!py-7 border-opacity-30 font-nunito font-semibold text-2xl outline-0 text-white bg-black"
                      : "border border-solid border-purpal rounded-lg w-full px-5 py-4 sm:py-3 sml:py-4 md:py-5 sm:px-5 sml:px-5 xl:!px-8 xl:!py-7 border-opacity-30 font-nunito font-semibold text-2xl outline-0"
                  }
                  type={eyeopen ? "text" : "password"}
                  onChange={handlePassword}
                />
                <p
                  className={
                    data2
                      ? "font-nunito font-semibold text-sm text-white absolute top-[-8px] left-14 bg-black px-5 opacity-90"
                      : "font-nunito font-semibold text-sm text-purpal absolute top-[-8px] left-14 bg-white px-5 opacity-90"
                  }
                >
                  Password
                </p>
                {eyeopen ? (
                  <FiEye
                    onClick={handleEye}
                    className="absolute top-6 right-6 sm:top-6 sml:top-7 xl:!top-9 "
                  />
                ) : (
                  <FiEyeOff
                    onClick={handleEye}
                    className="absolute top-6 right-6 sm:top-6 sml:top-7 xl:!top-9"
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
                  className="w-full h-auto bg-primary p-3 sm:p-2 sml:p-4 md:p-4 rounded-full mt-10 md:mt-12"
                  onClick={handleRegistration}
                >
                  <p className="font-nunito font-semibold text-white text-xl sml:text-base md:!text-xl">
                    Sign up
                  </p>
                </button>
              )}

              <p
                className={
                  data2
                    ? " font-semibold text-center mt-7 mb-0 sm:mb-0 sml:mb-0 extsm:mb-[10px] md:mt-9 text-white text-sm lg:text-base"
                    : " font-semibold text-center mt-7 mb-0 extsm:mb-[10px]sm:mb-0 sml:mb-0 md:mt-9 text-blue text-sm lg:text-base "
                }
              >
                Already have an account ?
                <Link to="/login" className="text-[#EA6C00] font-bold">
                  {" "}
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="sm:w-1/2 sml:w-1/2 lg:w-1/2 xl:w-1/2 hidden sm:block xl:block sml:block">
          <picture>
            <img
              className="md:!h-screen sm:h-[620px] sml:h-full lg:!h-[900px] xl:!h-screen w-full object-cover"
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
