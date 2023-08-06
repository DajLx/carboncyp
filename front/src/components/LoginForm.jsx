import React from "react";
import Form from "react-bootstrap/Form";

import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineLock } from "react-icons/ai";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUser } from "../state/user";
import TopPieceDiv from "../commons/TopPieceDiv";

const LoginForm = () => {
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
        "http://localhost:3001/api/user/login",
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordToShow, setPasswordToShow] = useState("");
  return (
    <div className="forms" style={{ "--h": "90vh", "--w": "100%" }}>
      <TopPieceDiv h={"20%"} />
      <div
        className="form-type "
        style={{ margin: "0 1rem" }}
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
      <div className="div-forms" style={{ "--h": "65%", margin: "0 1rem" }}>
        <div className="writer-on-form">
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
        <span>forgot your password?</span>
      </div>{" "}
      <div className="father-sing-up-button">
        <button
          className="sing-up-button"
          style={{ margin: "0 1rem" }}
          onClick={(e) => loginSubmit(e)}>
          login
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
