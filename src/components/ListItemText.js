import React from "react";
import "./ListItemText.css";

function ListItemText({ primary, secondary }) {
  return (
    <div className="listItemText">
      <h2 className="listItemText__primary">{primary}</h2>
      <p className="listItemText__secondary">{secondary}</p>
    </div>
  );
}

export default ListItemText;
