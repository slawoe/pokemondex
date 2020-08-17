import React, { useState } from "react";

function Input({ value, onChange }) {
  return (
    <input
      className="input"
      placeholder="Search your Pokemon..."
      value={value}
      onChange={(event) => onChange(event.target.value.trim())}
    />
  );
}

export default Input;
