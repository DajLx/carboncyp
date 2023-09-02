import React from "react";
import { useSelector } from "react-redux";
import CarbonView from "./CarbonView";
import MainView from "./MainView";

const Home = () => {
  const user = useSelector((state) => state.user);
  return user.name ? <CarbonView /> : <MainView />;
};

export default Home;
