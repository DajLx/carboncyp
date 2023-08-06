import React from "react";
import TopPieceDiv from "../commons/TopPieceDiv";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import { useSelector } from "react-redux";
//Example style, you can use another

const CarbonView = () => {
  const [code, setCode] = React.useState(
    `function add(a, b) {\n  return a + b;\n}`
  );
  const color = useSelector((state) => state.color);

  return (
    <div className="forms" style={{ "--h": "94vh" }}>
      <TopPieceDiv h="50%" />

      <div
        className="div-forms"
        style={{
          "--h": "50%",
          backgroundColor: color,
          border: "1px solid white",
          padding: "1rem",
        }}>
        <Editor
          className="div-forms carbon"
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) => highlight(code, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
          }}
        />
      </div>
    </div>
  );
};

export default CarbonView;
