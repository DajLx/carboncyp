import React from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
import { setHeart } from "../state/heart";

const EditorCode = () => {
  const dispatch = useDispatch();
  const color = useSelector((state) => state.color);
  const user = useSelector((state) => state.user);
  const [code, setCode] = React.useState(
    `function add(a, b) {\n  return a + b;\n}`
  );

  const getFavorites = async () => {};
  getFavorites();

  return (
    <div
      id="codeToImage"
      className="div-forms editor-code"
      style={{
        "--h": "46%",
        backgroundColor: color.color1,
        border: "1px solid white",
        padding: "1rem",
      }}>
      <Editor
        className="div-forms carbon"
        value={code}
        onValueChange={(code) => {
          setCode(code);
          dispatch(setHeart(false));
        }}
        highlight={(code) => highlight(code, languages.js)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
          backgroundColor: color.color2,
        }}
      />
    </div>
  );
};

export default EditorCode;
