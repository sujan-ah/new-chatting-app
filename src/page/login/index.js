import { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FiEyeOff, FiEye } from "react-icons/fi";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const Login = () => {
  let data2 = useSelector((state) => state.darkmood.value2);
  const navigate = useNavigate();
  const auth = getAuth();
  console.log(auth.currentUser);
  const provider = new GoogleAuthProvider();

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [eyeopen, setEyeopen] = useState(false);
  let [err, setErr] = useState("");
  let [loader, setLoader] = useState(false);

  let handleEmail = (e) => {
    setEmail(e.target.value);
    setErr("");
  };
  let handlePassword = (e) => {
    setPassword(e.target.value);
    setErr("");
  };

  let handleEye = () => {
    setEyeopen(!eyeopen);
  };

  let handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        setLoader(true);
        toast.success("Login Successfull! Wait for redirect");

        setTimeout(() => {
          setLoader(false);
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode.includes("auth/invalid-email")) {
          setErr("Email not match");
        }
        if (errorCode.includes("auth/wrong-password")) {
          setErr("Password not match");
        }
      });
  };

  let handleGoogleLogin = () => {
    signInWithPopup(auth, provider).then(() => {
      navigate("/");
    });
  };

  return (
    <div>
      <div className="flex">
        <ToastContainer position="top-left" theme={data2 ? "light" : "dark"} />
        <div className="sml:w-1/2 xl:w-1/2  flex flex-col items-end md:mt-36 lg:mt-20 xl:mt-36 sml:pb-4 md:pb-0 sm:ml-2 md:ml-10 p-2 sm:p-2 md:p-0">
          <div className="xl:w-[600px] sm:w-[350px] md:w-[350px] lg:w-[520px] px-2.5 md:px-5 xl:px-0 mt-5 md:mt-0 mb-5 xl:mb-0 ">
            {err && (
              <p className="bg-rose-600 px-4 py-2 rounded-lg mt-2 text-white font-nunito font-semibold text-xl text-center xl:w-2/3">
                {err}
              </p>
            )}
            <h2 className="font-nunito font-bold text-4xl sm:text-3xl sml:text-xl md:!text-3xl lg:!text-4xl lg:mr-[110px] text-center sm:text-start sml:text-start xl:text-start mt-5 sm:mt-14  lg:mt-0">
              Login to your account!
            </h2>

            <div className="xl:w-2/3">
              <button
                onClick={handleGoogleLogin}
                className="xl:w-3/5 h-auto flex border px-8 sm:px-3 md:px-5 lg:px-5 py-2 xl:py-5 sm:p-2 md:py-2 lg:py-2 rounded-lg mt-5 sm:mt-2 sm:mt-6 lg:mt-10 xl:mt-10  ml-auto xl:ml-0 sm:ml-0 md:ml-0 lg:ml-0 mr-auto sml:ml-0 sml:mr-0"
              >
                <FcGoogle className=" text-2xl md:text-2xl lg:text-2xl sm:text-2xl" />
                <p
                  className={
                    data2
                      ? "font-nunito font-bold text-white text-sm ml-2.5 mt-[2px]"
                      : "font-nunito font-bold text-blue text-sm ml-2.5 mt-[2px]"
                  }
                >
                  Login with Google
                </p>
              </button>

              <div className="relative mt-14 extsm:mt-16 sm:mt-8 md:mt-16 lg:!mt-12 xl:mt-16">
                <input
                  className={
                    data2
                      ? "border-b border-solid border-white w-full  py-4 sm:py-4 md:py-4 lg:py-4 sml:py-4 xl:!py-7 border-opacity-30 font-nunito font-semibold text-2xl outline-0 bg-black"
                      : "border-b border-solid border-purpal w-full  py-4 sm:py-4 md:py-4 lg:py-4 sml:py-4 xl:!py-7 border-opacity-30 font-nunito font-semibold text-2xl outline-0"
                  }
                  type="email"
                  onChange={handleEmail}
                />
                <p
                  className={
                    data2
                      ? "font-nunito font-semibold text-sm text-white absolute top-[-8px]  bg-black opacity-90 "
                      : "font-nunito font-semibold text-sm text-purpal absolute top-[-8px]  bg-white opacity-90 "
                  }
                >
                  Email Address
                </p>
              </div>

              <div className="relative mt-12  extsm:mt-16 sm:mt-8 md:mt-14">
                <input
                  className={
                    data2
                      ? "border-b border-solid border-white w-full py-4 sm:py-4 md:py-4 lg:py-4 sml:py-4 xl:!py-7 border-opacity-30 font-nunito font-semibold text-2xl outline-0 bg-black"
                      : "border-b border-solid border-purpal w-full py-4 sm:py-4 md:py-4 lg:py-4 sml:py-4 xl:!py-7 border-opacity-30 font-nunito font-semibold text-2xl outline-0"
                  }
                  type={eyeopen ? "text" : "password"}
                  onChange={handlePassword}
                />
                <p
                  className={
                    data2
                      ? "font-nunito font-semibold text-sm text-white absolute top-[-8px]  bg-black opacity-90 "
                      : "font-nunito font-semibold text-sm text-purpal absolute top-[-8px]  bg-white opacity-90 "
                  }
                >
                  Password
                </p>

                {eyeopen ? (
                  <FiEye
                    onClick={handleEye}
                    className="absolute top-7 right-6 sml:top-7 xl:!top-9"
                  />
                ) : (
                  <FiEyeOff
                    onClick={handleEye}
                    className="absolute top-7 right-6 sm:top-7 sml:top-7 xl:!top-9"
                  />
                )}
              </div>

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
                  className="w-full h-auto bg-primary p-6 sm:p-2 md:p-4 lg:p-4 rounded-lg mt-12 sm:mt-8 md:mt-10 lg:mt-10"
                  onClick={handleLogin}
                >
                  <p className="font-nunito font-semibold text-white text-xl">
                    Login to Continue
                  </p>
                </button>
              )}

              <p
                className={
                  data2
                    ? "px-5 font-semibold mt-9 sm:mt-6 xl:mt-8  md:mt-8 lg:mt-8 text-white"
                    : "px-5 font-semibold mt-9 sm:mt-6 md:mt-8 xl:mt-8 lg:mt-8 text-blue"
                }
              >
                Don???t have an account ?
                <Link to="/registration" className="text-[#EA6C00] font-bold">
                  {" "}
                  Sign Up
                </Link>
              </p>

              <p className="px-5 font-semibold mt-6 sm:mt-2 md:mt-6 lg:mt-4 text-center">
                <Link to="/forgotpassword" className="text-primary font-bold">
                  {" "}
                  Forgot Password
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="sml:w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 sml:block">
          <picture>
            <img
              className="md:!h-screen hidden sm:block lg:block xl:block md:block sm:h-[640px] sml:h-full w-full object-cover"
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
