import React from "react";
import { FiSun } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { HiDownload } from "react-icons/hi";
import { useSelector } from "react-redux";
import { MdKeyboardArrowDown } from "react-icons/md";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { setColor } from "../state/color";

// import styles from "prismjs/themes"; //Example style, you can use another

const TopPieceDiv = ({ h }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
  const [localColor, setLocalColor] = useState(color);
  const user = useSelector((state) => state.user);
  const valueOrNone = () => (user.name ? "" : "none");

  return (
    <div className="topPieceDiv" style={{ "--h": h }}>
      <div className="father-sun">
        <button
          className="button-top"
          style={{ display: valueOrNone(), alignItems: "center" }}>
          <HiDownload />
        </button>
        <button
          className="button-top"
          style={{ display: valueOrNone(), alignItems: "center" }}>
          <AiOutlineHeart />
        </button>
        <button className="button-top">
          <FiSun />
        </button>
        <button
          className="button-top"
          style={{ display: valueOrNone(), alignItems: "center" }}>
          <AiOutlineUser />
        </button>
      </div>
      <hr style={{ color: "white", margin: "0.5rem 0", opacity: "100%" }} />
      <h3>Carbon copy</h3>
      <h6>give style to your code</h6>
      <Dropdown
        as={ButtonGroup}
        style={{ width: "100%", display: valueOrNone() }}>
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
        <Button variant="success" className="options">
          format
        </Button>

        <Dropdown.Toggle
          split
          variant="success"
          id="dropdown-split-basic"
          className="options"
          style={{ width: "20%" }}
        />
        <Dropdown.Menu>
          <Dropdown.Item href="#/action-4">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-5">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-6">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown
        as={ButtonGroup}
        style={{ width: "100%", display: valueOrNone() }}>
        <Button variant="success" className="options">
          <div
            style={{
              width: "25px",
              height: "19px",
              border: "1px solid white",
              borderRadius: "10px",
              backgroundColor: localColor,
            }}></div>
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
            <HexColorPicker color={localColor} onChange={setLocalColor} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                handleClose(), dispatch(setColor(localColor));
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
