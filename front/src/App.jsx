import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "./state/user";
import { useEffect } from "react";

function App() {
  window.ubication = "prismjs/themes/prism-min.css";
  
  const dispatch = useDispatch();
  const LS = JSON.parse(localStorage.getItem("token"));
  if (LS?.token) {
    useEffect(() => {
      axios
        .post(
          "http://localhost:3001/api/user/me",
          { token: LS.token },
          { withCredentials: true }
        )
        .then((res) => dispatch(setUser(res.data.user)));
    }, []);
  }

  return (
    <Routes>
      
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  );
}

export default App;
