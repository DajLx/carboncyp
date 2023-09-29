import React, { useRef } from "react";
import TopPieceDiv from "../commons/TopPieceDiv";
import EditorCode from "./EditorCode";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";

//Example style, you can use another

const CarbonView = () => {
  return (
    <div className="carbon-view-container"
      style={{
       
      }}>
      <div className="forms carbon-pc-view" style={{ "--h": "94vh",  }}>
        <TopPieceDiv h="52%" />
        <EditorCode />
      </div>
    </div>
  );
};

export default CarbonView;
