import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineLock } from "react-icons/ai";
import { FiSun } from "react-icons/fi";
import { useNavigate } from "react-router";
import axios from "axios";
import TopPieceDiv from "../commons/TopPieceDiv";
const RegisterForm = () => {
  const navigate = useNavigate()
  const registerSubmit = (e) => {
    e.preventDefault();

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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [passwordToShow, setPasswordToShow] = useState("");

  return (
    <div className="forms" style={{ "--h": "90vh", "--w": "100%" }}>
      <TopPieceDiv h={"20%"} />
      <div className="form-type" style={{margin:"0 1rem"}} onClick={() => navigate("/login")}>
        <span
          style={{
            position: "relative",
            top: "6px",
            right: "2px",
            fontSize: "24px",
          }}
        >
          ° ° °
        </span>
        {"  "}
        Register
      </div>
      <div className="div-forms" style={{ "--h": "65%", margin: "0 1rem" }}>
        <div className="writer-on-form">
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
        <Form style={{ marginTop: "1rem" }}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <div style={size}>{<AiOutlineUser />}</div>
            <Form.Control
              className="inputs-form"
              type="text"
              placeholder="UserName"
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
              placeholder="Enter email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <div style={size}>{<AiOutlineLock />}</div>
            <Form.Control
              className="inputs-form"
              type="password"
              placeholder="Password"
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
          </Form.Group>
        </Form>
      </div>
      <div className="father-sing-up-button"  >
        <button className="sing-up-button" style={{margin:"0 1rem"}} onClick={(e) => registerSubmit(e)}>
          sing Up
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
