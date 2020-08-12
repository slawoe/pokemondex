import React from "react";
import "./ListImg.css";

function ListImg({ src, alt }) {
  return <img className="listImg" src={src} alt={alt} />;
}

export default ListImg;
