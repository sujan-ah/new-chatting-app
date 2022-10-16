import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  let [forgotemail, setForgotemail] = useState("");

  const auth = getAuth();

  let handlePasswordChange = () => {
    sendPasswordResetEmail(auth, forgotemail).then(() => {
      toast.success("Please Check Your Email");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    });
  };

  return (
    <div className="w-full h-screen bg-primary flex justify-center items-center">
      <ToastContainer position="top-left" theme="dark" />
      <div className="w-auto bg-white text-center p-10 rounded-lg">
        <h1 className="font-nunito text-[45px] font-bold text-primary">
          Forgot Password
        </h1>

        <div className="mt-10 w-full">
          <input
            className="border border-solid border-purpal rounded-lg px-8 py-5 border-opacity-30 font-nunito font-semibold text-2xl outline-0"
            type="email"
            placeholder="Email Address"
            onChange={(e) => setForgotemail(e.target.value)}
          />
        </div>

        <div className="flex justify-between">
          <button
            className="w-50	 h-auto bg-primary p-6 rounded-lg mt-12"
            onClick={handlePasswordChange}
          >
            <p className="font-nunito font-semibold text-white text-xl">
              Password Change
            </p>
          </button>
          <button
            className="w-32 h-auto bg-amber-600	 p-6 rounded-lg mt-12"
            //   onClick={handleLogin}
          >
            <p className="font-nunito font-semibold text-white text-xl">
              <Link to="/login" className="text-white font-bold ">
                {" "}
                Cancel
              </Link>
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
