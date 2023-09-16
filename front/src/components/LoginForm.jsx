import React from "react";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineLock } from "react-icons/ai";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUser } from "../state/user";
import TopPieceDiv from "../commons/TopPieceDiv";
import { IoEyeSharp } from "react-icons/io5";

const LoginForm = () => {
  const theme = useSelector((state) => state.theme);
  const [type, setType] = useState("password");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const size = {
    height: "29px",
    width: "29px",
    border: "1px solid white",
    borderRadius: "10rem",
    position: "absolute",
    marginTop: "5px",
    marginLeft: "0.5rem",
  };
  const loginSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "https://carbon-service.onrender.com/api/user/login",
        { email, password },
        { withCredentials: true }
      )
      .then((res) => {
        localStorage.setItem(
          "token",
          JSON.stringify({ token: res.data.token })
        );
        dispatch(setUser(res.data.payload));
        navigate("/");
      });
  };
  const [email, setEmail] = useState("email");
  const [password, setPassword] = useState("password");
  const [passwordToShow, setPasswordToShow] = useState("");
  return (
    <div className="container-register">
      <div
        className="register-form forms"
        style={{ "--h": "90vh", "--w": "100%" }}
        id="test">
        <TopPieceDiv h={"25%"} />

        <div
          className="form-type "
          onClick={() => {
            navigate("/register");
          }}>
          <span
            style={{
              position: "relative",
              top: "6px",
              right: "2px",
              fontSize: "24px",
            }}>
            ° ° °
          </span>
          Login
        </div>
        <div className="div-forms form-login">
          <div className={`writer-on-form ${theme ? " dark" : ""}`}>
            <p style={{ marginBottom: "0", marginTop: "5px" }}>
              let user= {"{ email: "}
              <span className="value-on-form">{email}</span>
            </p>
            <p>
              password:
              <span className="value on form">
                {passwordToShow} {"}"}
              </span>
            </p>
          </div>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <div style={size}>{<AiOutlineMail />}</div>
              <Form.Control
                className="inputs-form"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <div style={size}>{<AiOutlineLock />}</div>
              <Form.Control
                className="inputs-form"
                type={type}
                value={password}
                onClick={() => setPassword("")}
                onChange={(e) => {
                  passwordToShow.length > e.target.value.length
                    ? setPasswordToShow(
                        passwordToShow.slice(0, passwordToShow.length - 1)
                      )
                    : setPasswordToShow(
                        passwordToShow ? passwordToShow.concat("*") : "*"
                      );
                  setPassword(e.target.value);
                }}
                on
              />
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}>
                <div
                  style={{
                    height: "29px",
                    width: "29px",
                    border: "1px solid white",
                    borderRadius: "10rem",
                    position: "absolute",
                    marginTop: "-57px",
                    marginRight: "7px",
                  }}>
                  <IoEyeSharp
                    onClick={() => {
                      setType(type === "text" ? "password" : "text");
                    }}
                  />
                </div>
              </div>
            </Form.Group>
          </Form>{" "}
          <div className="father-sing-in-button">
            <button
              className="sing-up-button login-button"
              onClick={(e) => loginSubmit(e)}>
              login
            </button>
            <span>forgot your password?</span>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
