import "./App.css";
import { Route, Routes } from "react-router";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./state/user";
import { setFavorite } from "./state/favorites";
import { useEffect } from "react";
import Profile from "./components/Profile";
import Favorites from "./components/Favorites";

function App() {
  window.ref = "";

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const LS = JSON.parse(localStorage.getItem("token"));

  {
    useEffect(() => {
      if (LS?.token) {
        if (!user.id) {
          axios
            .post(
              "https://carbon-service.onrender.com/api/user/me",
              { token: LS.token },
              { withCredentials: true }
            )
            .then((res) => dispatch(setUser(res.data.user)));
        }
      }
      if (user.id) {
        axios
          .get(`https://carbon-service.onrender.com/api/user/getAllFavorites/${user.id}`, {
            withCredentials: true,
          })
          .then((res) => dispatch(setFavorite(res.data)));
      }
    }, [user]);
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  );
}

export default App;
