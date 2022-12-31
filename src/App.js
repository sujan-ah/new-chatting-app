import "./App.css";
import { Routes, Route } from "react-router-dom";
import Registration from "./page/registration/index";
import Login from "./page/login/index";
import Home from "./page/home/index";
import Message from "./page/message";
import Notification from "./page/notification";
import ForgotPassword from "./page/forgot password";
import Imgupload from "./components/Imgupload";
import Darkmood from "./components/Darkmood";
import { useSelector } from "react-redux";

function App() {
  let data2 = useSelector((state) => state.darkmood.value2);

  return (
    <div className={data2 ? "bg-black text-white" : "bg-white"}>
      <Darkmood />
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
