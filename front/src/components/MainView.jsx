import React from "react";
import Img1 from "../assets/Group 19.png";
import img2 from "../assets/Group 20.png";
import { BsArrowRight } from "react-icons/bs";
import { AiOutlineLine } from "react-icons/ai";
import { useNavigate } from "react-router";

const MainView = () => {
  const navigate = useNavigate();
  return (
    <div id="mainViewContainer">
      <div className="carbon-copy">
        <div>
          <img
            src={Img1}
            alt=""
            srcset=""
            className="imgs"
            style={{ "--t": "6.5rem", "--r": "7.3rem" }}
          />
          <img
            src={img2}
            alt=""
            srcset=""
            className="imgs"
            style={{ "--t": "1rem", "--r": "2.5rem" }}
          />
          <h1 className="title-carbon">CARBON COPY</h1>
        </div>
      </div>
      <div className="nextView">
        <h6>proyecto educativo inspirado en carbon</h6>
        <div style={{ width: "100%" }}>
          <button
            style={{
              backgroundColor: "transparent",
              marginTop: "1rem ",
              width: "100%",
              borderRadius: "2rem",
              height: "3rem",
              color: "white",
            }}
            onClick={() => {
              navigate("/register");
            }}
          >
            <AiOutlineLine
              style={{
                position: "absolute",
                margin: "2rem 0 0 56%",
                zIndex: "2",
                margin: "-1.4rem 0 0 0  ",
                marginLeft: "-3rem",
                fontSize: "3rem",
                color: "white",
              }}
            />
            <AiOutlineLine
              style={{
                position: "absolute",
                margin: "2rem 0 0 56%",
                zIndex: "2",
                margin: "-1.4rem 0 0 -2rem ",
                fontSize: "3rem",
                color: "white",
              }}
            />
            <BsArrowRight
              style={{
                position: "absolute",
                margin: "2rem 0 0 58%",
                zIndex: "2",
                margin: "-1.4rem 0 0 0",
                fontSize: "3rem",
                color: "white",
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainView;
