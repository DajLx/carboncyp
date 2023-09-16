import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "../state/user";
import { useNavigate } from "react-router";
const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState("none");
  const [type, setType] = useState("password");
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const [oldPassword, setOldPasswword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const verifierData = (data) => {
    const dataToUpdate = {};
    for (const verifir in data) {
      if (data[verifir]) {
        dataToUpdate[verifir] = data[verifir];
      }
    }
    return dataToUpdate;
  };
  const updateInfo = (e) => {
    e.preventDefault();
    if (!(newPassword === confirmPassword)) {
      return alert("the passwords are not the same");
    }
    const data = {
      name,
      email,
      oldPassword,
      newPassword,
    };

    axios
      .put(
        `https://carbon-service.onrender.com/api/user/editMe/${user.id}`,
        verifierData(data),
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.newPassword) return alert("password changed");

        localStorage.clear();
        localStorage.setItem(
          "token",
          JSON.stringify({ token: res.data.token }),
          dispatch(setUser(res.data.payload))
        );
      });
  };
  const toggleShow = () => (!show ? setShow("none") : setShow(""));

  return user.name ? (
    <Card
      style={{
        width: "18rem",
        margin: "0 auto",
      }}>
      <Card.Body>
        <Card.Title>
          <div
            style={{
              height: "7rem",
              borderRadius: "3rem",
              backgroundColor: "red",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "6rem",
              margin: "0 auto",
            }}>
            <p style={{ color: "white", fontSize: "xxx-large" }}>
              {user.name?.[0] || "a"}
            </p>
          </div>
        </Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <label>
          name
          <input
            style={{ width: "100%" }}
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={!name ? user.name : name}></input>
        </label>
        <label>
          mail
          <input
            style={{ width: "100%" }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={!email ? user.email : email}></input>
        </label>
        <div style={{ display: show }}>
          <label>
            old password
            <input
              style={{ width: "100%" }}
              type={type}
              onChange={(e) => {
                setOldPasswword(e.target.value);
              }}
            />
          </label>
          <label>
            new password
            <input
              style={{ width: "100%" }}
              type={type}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
          </label>
          <label>
            confirm password
            <input
              style={{ width: "100%" }}
              type={type}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </label>
        </div>
        <span
          onClick={() => {
            toggleShow();
          }}>
          do you want to change your password?
        </span>
      </ListGroup>
      <button
        style={{ marginTop: "1rem" }}
        onClick={(e) => {
          updateInfo(e);
        }}>
        upload
      </button>
      <a onClick={() => navigate("/")}> do you want to go back to the code? </a>
    </Card>
  ) : (
    <h1 style={{ color: "white" }}>
      {" "}
      you most bee loged to see your profile{" "}
      <a onClick={() => navigate("/")} style={{ color: "white" }}>
        touch here to come back
      </a>
    </h1>
  );
};

export default Profile;
