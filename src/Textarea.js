import React from "react";

function Input({ inputState, setInputState, handleAddItem, category }) {
  return (
    <div>
      <input
        type="text"
        value={inputState}
        onChange={(e) => setInputState(e.target.value)}
      />
      <button
        onClick={() => handleAddItem(category, inputState, setInputState)}
      >
        Ekle
      </button>
    </div>
  );
}

export default Input;
