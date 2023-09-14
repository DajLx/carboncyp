import { FiSun } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { BsHeart } from "react-icons/bs";
import { BsFillHeartFill } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { setColor } from "../state/color";
import { useNavigate } from "react-router";
import axios from "axios";
import exportAsImage from "../utls/exportAsImage";
import { addFavorite } from "../state/favorites";
import toggleTheme from "../utls/toggleTheme";
import { setTheme } from "../state/theme";
import Img1 from "../assets/Group 19.png";
import img2 from "../assets/Group 20.png";
import { setHeart } from "../state/heart";
import { useLocation } from "react-router";
import TopPieceDivPc from "./TopPieceDivPc";

// import styles from "prismjs/themes"; //Example style, you can use another

const TopPieceDiv = ({ h }) => {
  console.log(useLocation());
  const navi = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const heart = useSelector((state) => state.heart);
  const [show, setShow] = useState(false);
  const [formatAndName, setFormatAndName] = useState("format");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const logout = () => localStorage.clear();
  const createImage = (format, name) => exportAsImage.toDownload[format](name);
  const verifier = (format) => formatAndName.split(".")[1] != undefined;
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
  const [style, setStyle] = useState("style");

  const color = useSelector((state) => state.color);
  const [localColor, setLocalColor] = useState(color.color1);
  const [localColor2, setLocalColor2] = useState(color.color2);

  const user = useSelector((state) => state.user);

  const valueOrNone = () => (user.name ? "" : "none");

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

  const dowloadFile = () => {
    const extension = formatAndName.split(".")[1];
    extension
      ? createImage(extension.toLocaleUpperCase(), formatAndName)
      : alert("escoge un formato de descarga");
  };

  return (
    <div
      className="topPieceDiv"
      style={{ "--h": h ? h : "25%", "--hp": "45%" }}>
      <div className="father-sun">
        <button
          className="button-top"
          style={{ display: valueOrNone(), alignItems: "center" }}
          onClick={() => dowloadFile()}>
          <HiDownload />
        </button>
        <button
          className="button-top"
          style={{ display: valueOrNone(), alignItems: "center" }}
          onClick={(e) => {
            createFavorite(e);
            dispatch(setHeart(true));
          }}>
          {heart ? <BsFillHeartFill style={{ color: "red" }} /> : <BsHeart />}
        </button>
        <button
          className="button-top"
          onClick={() => {
            toggleTheme();
            dispatch(setTheme(theme ? false : true));
          }}>
          <FiSun />
        </button>
        <Dropdown as={ButtonGroup} style={{ display: valueOrNone() }}>
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
      <hr
        className="hr"
        style={{
          "--p": useLocation().pathname === "/" ? "relative" : "fixed",
          "--t": useLocation().pathname === "/" ? "0" : "100rem",
        }}
      />
      <TopPieceDivPc />

      <div className="carbon-form-mobile">
        <h3 className="orbitron">carbon copy </h3>

        <h6>give style to your code</h6>
      </div>
      <Dropdown
        as={ButtonGroup}
        style={{ width: "100%", display: valueOrNone(), marginTop: "1rem" }}>
        <Button variant="success" className="options">
          {style}
        </Button>

        <Dropdown.Toggle
          split
          variant="success"
          id="dropdown-split-basic"
          className="options"
          style={{ width: "20%" }}
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
      <Dropdown
        as={ButtonGroup}
        style={{ width: "100%", display: valueOrNone() }}>
        <input
          variant="success"
          className="options"
          value={formatAndName}
          style={{ borderRadius: "2rem 0 0 2rem" }}
          onChange={(e) => setFormatAndName(e.target.value)}></input>

        <Dropdown.Toggle
          split
          variant="success"
          id="dropdown-split-basic"
          className="options"
          style={{ width: "20%" }}
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
      <Dropdown
        as={ButtonGroup}
        style={{ width: "100%", display: valueOrNone() }}>
        <Button variant="success" className="options">
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
          className="options"
          style={{ width: "20%" }}
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
              <HexColorPicker color={localColor2} onChange={setLocalColor2} />
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
  );
};

export default TopPieceDiv;
