import React, { useRef } from "react";
import TopPieceDiv from "../commons/TopPieceDiv";
import EditorCode from "./EditorCode";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";

//Example style, you can use another

const CarbonView = () => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        padding: "0 2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}>
      <div className="forms carbon-pc-view" style={{ "--h": "94vh" }}>
        <TopPieceDiv h="54%" />
        <EditorCode />
      </div>
    </div>
  );
};

export default CarbonView;
