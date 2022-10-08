import logo from "./logo.svg";
import "./App.css";
import Registration from "./page/registration/index";
import { Routes, Route } from "react-router-dom";
import Login from "./page/login/index";

function App() {
  return (
    <Routes>
      <Route path="/registration" element={<Registration />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
}

export default App;
