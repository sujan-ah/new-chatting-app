import logo from "./logo.svg";
import "./App.css";
import Registration from "./page/registration";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/registration" element={<Registration />}></Route>
    </Routes>
  );
}

export default App;
