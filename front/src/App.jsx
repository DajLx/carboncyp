import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router";
import MainView from "./components/MainView";
import LoginForm from "./components/LoginForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<MainView />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  );
}

export default App;
