import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineLock } from "react-icons/ai";
import { IoEyeSharp } from "react-icons/io5";
import { useNavigate } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";
import TopPieceDiv from "../commons/TopPieceDiv";
const RegisterForm = () => {
  const theme = useSelector((state) => state.theme);
  const navigate = useNavigate();
  const registerSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("por favor ingrese los datos");
    } else {
      axios
        .post(
          "http://localhost:3001/api/user/register",
          {
            name,
            email,
            password,
          },
          { withCredentials: true }
        )
        .then((res) => navigate("/login"));
    }
  };
  const size = {
    height: "29px",
    width: "29px",
    border: "1px solid white",
    borderRadius: "10rem",
    position: "absolute",
    marginTop: "5px",
    marginLeft: "0.5rem",
  };

  const [name, setName] = useState("userName");
  const [email, setEmail] = useState("email");

  const [password, setPassword] = useState("password");
  const [passwordToShow, setPasswordToShow] = useState("");
  const [type, setType] = useState("password");

  return (
    <div className="container-register">
      <div className="register-form forms">
        <TopPieceDiv h={"25%"}  />
    
        <div className="form-type" onClick={() => navigate("/login")}>
          <span
            style={{
              position: "relative",
              top: "6px",
              right: "2px",
              fontSize: "24px",
            }}>
            ° ° °
          </span>
          {"  "}
          Register
        </div>
        <div className="div-forms form-register">
          <div className={`writer-on-form ${theme ? " dark" : ""}`}>
            <p style={{ marginBottom: "0", marginTop: "5px" }}>
              let user={"{ name:"} <span className="value-on-form">{name}</span>
            </p>
            <p style={{ marginBottom: "0" }}>
              email: <span className="value-on-form">{email}</span> ,
            </p>
            <p style={{ marginBottom: "0" }}>
              password: <span className="value-on-form">{passwordToShow}</span>
              {"}"}
            </p>
          </div>
          <Form style={{ marginTop: "-0.5rem", height: "70%" }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <div style={size}>{<AiOutlineUser />}</div>
              <Form.Control
                className="inputs-form"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Group>

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

            <div className="father-sing-up-button">
              {" "}
              <button
                className="sing-up-button"
                onClick={(e) => registerSubmit(e)}>
                sing Up
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
