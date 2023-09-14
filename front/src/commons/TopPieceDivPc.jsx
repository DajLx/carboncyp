import { FiSun } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import React, { useState } from "react";
import Img1 from "../assets/Group 19.png";
import img2 from "../assets/Group 20.png";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useNavigate } from "react-router";
import { BsHeart } from "react-icons/bs";
import { BsFillHeartFill } from "react-icons/bs";
import toggleTheme from "../utls/toggleTheme";
import { setTheme } from "../state/theme";
import { HiDownload } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { HexColorPicker } from "react-colorful";
import exportAsImage from "../utls/exportAsImage";
import { setColor } from "../state/color";
import { setHeart } from "../state/heart";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
const TopPieceDivPc = ({ h }) => {
  const theme = useSelector((state) => state.theme);
  const heart = useSelector((state) => state.heart);
  const [style, setStyle] = useState("style");
  const [formatAndName, setFormatAndName] = useState("format");
  const color = useSelector((state) => state.color);
  const user = useSelector((state) => state.user);
  const [localColor, setLocalColor] = useState(color.color1);

  const [localColor2, setLocalColor2] = useState(color.color2);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navi = useNavigate();
  const styles = [
    "prism",
    "prism-coy",
    "prism-twilight",
    "prism-dark",
    "prism-funky",
    "prism-okaidia",
    "prism-solarizedlight",
    "prism-tomorrow",
  ];
  const createImage = (format, name) => exportAsImage.toDownload[format](name);
  const verifier = (format) => formatAndName.split(".")[1] != undefined;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dowloadFile = () => {
    const extension = formatAndName.split(".")[1];
    extension
      ? createImage(extension.toLocaleUpperCase(), formatAndName)
      : alert("escoge un formato de descarga");
  };
  const createFavorite = async (e) => {
    e.preventDefault();
    const binaryCode = await exportAsImage.toCreateImage.PNG();
    axios
      .post(
        "http://localhost:3001/api/user/addFavorite",
        {
          binaryCode,
          user_id: user.id,
          formatAndName,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data, "im the favorite"),
          dispatch(addFavorite(res.data));
      });
  };
  return (
    <div className={"carbon-form top-piece-div-pc"}>
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}>
        <img src={Img1} alt="" srcset="" className="img-rose-on-form" />
        <img src={img2} alt="" srcset="" className="img-green-on-form" />

        <div className="carbon-copy-form">
          <div>
            <div className="title-on-main-view">
              <h2 className="title-carbon orbitron">carbon</h2>
              <h2 className="title-carbon orbitron">copy</h2>
              <h6
                style={{
                  marginBottom: "0",
                  fontSize: "0.6rem",
                  marginTop: "10px",
                }}>
                give style to your code
              </h6>
            </div>
          </div>
        </div>
        <div style={{ width: "100%", display: "flex" }}>
          <div
            className="father-options"
            style={{
              display: "flex",
              justifyContent: "space-evenly",
            }}>
            <Dropdown as={ButtonGroup} className="button-size">
              <Button
                variant="success"
                className="options pc-options"
                style={{ width: "300%" }}>
                {style}
              </Button>

              <Dropdown.Toggle
                split
                variant="success"
                id="dropdown-split-basic"
                className="options pc-options"
              />

              <Dropdown.Menu>
                {styles.map((styleName) => (
                  <Dropdown.Item
                    as="button"
                    onClick={async () => {
                      await import(
                        `../../node_modules/prismjs/themes/${styleName}.css`
                      );
                      setStyle(styleName);
                    }}>
                    {styleName}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown as={ButtonGroup} className="button-size">
              <input
                variant="success"
                className="options pc-options"
                value={formatAndName}
                style={{ borderRadius: "2rem 0 0 2rem", width: "300%" }}
                onChange={(e) => setFormatAndName(e.target.value)}></input>

              <Dropdown.Toggle
                split
                variant="success"
                id="dropdown-split-basic"
                className="options pc-options"
              />

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() =>
                    setFormatAndName(
                      verifier(formatAndName)
                        ? formatAndName.split(".")[0].concat(".jpeg")
                        : `${formatAndName}.jpeg`
                    )
                  }>
                  JPEG
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() =>
                    setFormatAndName(
                      verifier(formatAndName)
                        ? formatAndName.split(".")[0].concat(".png")
                        : `${formatAndName}.png`
                    )
                  }>
                  PNG
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() =>
                    setFormatAndName(
                      verifier(formatAndName)
                        ? formatAndName.split(".")[0].concat(".svg")
                        : `${formatAndName}.svg`
                    )
                  }>
                  SVG
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown as={ButtonGroup} className="button-size">
              <Button
                variant="success"
                className="options pc-options"
                style={{ width: "300%" }}>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      width: "25px",
                      height: "19px",
                      border: "1px solid white",
                      borderRadius: "10px",
                      backgroundColor: localColor,
                      marginRight: "7px",
                    }}></div>
                  <div
                    style={{
                      width: "25px",
                      height: "19px",
                      border: "1px solid white",
                      borderRadius: "10px",
                      backgroundColor: localColor2,
                    }}></div>
                </div>
              </Button>

              <Dropdown.Toggle
                split
                variant="success"
                id="dropdown-split-basic"
                className="options pc-options"
                onClick={handleShow}
              />

              <Modal show={show} onHide={handleClose}>
                <Modal.Header style={{ background: "transparent" }} closeButton>
                  <Modal.Title>
                    here you can view the color
                    <div
                      style={{
                        width: "25px",
                        height: "19px",
                        border: "1px solid white",
                        borderRadius: "10px",
                        backgroundColor: localColor,
                      }}></div>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div style={{ display: "flex" }}>
                    <HexColorPicker
                      color={localColor}
                      onChange={setLocalColor}
                      style={{ marginRight: "1rem" }}
                    />
                    <HexColorPicker
                      color={localColor2}
                      onChange={setLocalColor2}
                    />
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      handleClose(),
                        setLocalColor(color.color1),
                        setLocalColor2(color.color2);
                    }}>
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleClose(),
                        dispatch(
                          setColor({ color1: localColor, color2: localColor2 })
                        );
                    }}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            </Dropdown>
          </div>
          <div
            style={{
              width: "20%",
              display: "flex",
            }}>
            <button
              className="button-top"
              style={{ alignItems: "center" }}
              onClick={() => dowloadFile()}>
              <HiDownload />
            </button>
            <button
              className="button-top"
              style={{ alignItems: "center" }}
              onClick={(e) => {
                createFavorite(e);
                dispatch(setHeart(true));
              }}>
              {heart ? (
                <BsFillHeartFill style={{ color: "red" }} />
              ) : (
                <BsHeart />
              )}
            </button>
            <button
              className="button-top"
              onClick={() => {
                toggleTheme();
                dispatch(setTheme(theme ? false : true));
              }}>
              <FiSun />
            </button>
            <Dropdown as={ButtonGroup} style={{}}>
              <Button
                variant="success"
                className="button-top"
                style={{ margin: "0 0" }}>
                <AiOutlineUser />{" "}
                <Dropdown.Toggle
                  split
                  variant="success"
                  id="dropdown-split-basic"
                  style={{
                    marginLeft: "0 0",
                    backgroundColor: "transparent",
                    border: "none",
                  }}
                />
              </Button>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    navi("/profile");
                  }}>
                  Profile
                </Dropdown.Item>

                <Dropdown.Item
                  onClick={() => {
                    navi("/favorites");
                  }}>
                  Favorites
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    logout(), window.location.reload(true);
                  }}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPieceDivPc;
