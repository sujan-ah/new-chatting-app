import logo from "./logo.svg";
import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Registration from "./page/registration/index";
import Login from "./page/login/index";
import Home from "./page/home/index";
import Message from "./page/message";
import Notification from "./page/notification";
import ForgotPassword from "./page/forgot password";
import Imgupload from "./components/Imgupload";

function App() {
  let [dark, setDark] = useState(false);
  return (
    <div className={dark ? "bg-black text-white" : "bg-white"}>
      <div>
        <input
          className="dark"
          onChange={() => setDark(!dark)}
          id="abc"
          type="checkbox"
        />
        <label className="abc" for="abc"></label>
      </div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/registration" element={<Registration />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/message" element={<Message />}></Route>
        <Route path="/notification" element={<Notification />}></Route>
        <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
        <Route path="/imgupload" element={<Imgupload />}></Route>
      </Routes>
    </div>
  );
}

export default App;
