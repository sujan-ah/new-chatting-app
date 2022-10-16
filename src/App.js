import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Registration from "./page/registration/index";
import Login from "./page/login/index";
import Home from "./page/home/index";
import Message from "./page/message";
import ForgotPassword from "./page/forgot password";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/registration" element={<Registration />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/message" element={<Message />}></Route>
      <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
    </Routes>
  );
}

export default App;
