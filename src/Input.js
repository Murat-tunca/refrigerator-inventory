import React from "react";

const Input = ({ category, inputState, setInputState, handleAddItem }) => {
  const [message, setMessage] = React.useState("");

  const addItemClick = () => {
    handleAddItem(category, inputState, setInputState, message);
  };

  return (
    <div>
      <input
        type="text"
        value={inputState}
        onChange={(e) => setInputState(e.target.value)}
      />
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Mesaj ekleyin"
      />
      <button onClick={addItemClick}>Ekle</button>
    </div>
  );
};

export default Input;
