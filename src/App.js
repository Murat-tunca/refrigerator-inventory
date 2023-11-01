import React, { useState, useEffect } from "react";
import { loadState, saveState } from "./localStorage";
import "./App.css";

function App() {
  const [meats, setMeats] = useState([]);
  const [fruitsVegetables, setFruitsVegetables] = useState([]);
  const [freezer, setFreezer] = useState([]);
  const [meatsInput, setMeatsInput] = useState("");
  const [fruitsVegetablesInput, setFruitsVegetablesInput] = useState("");
  const [freezerInput, setFreezerInput] = useState("");
  const [imagePath, setImagePath] = useState(
    process.env.PUBLIC_URL + "/fotograflar/image1.jpg"
  );

  useEffect(() => {
    const storedMeats = loadState("meats");
    const storedFruitsVegetables = loadState("fruitsVegetables");
    const storedFreezer = loadState("freezer");

    if (storedMeats) {
      setMeats(storedMeats);
    }

    if (storedFruitsVegetables) {
      setFruitsVegetables(storedFruitsVegetables);
    }

    if (storedFreezer) {
      setFreezer(storedFreezer);
    }
  }, []);

  const handleAddItem = (category, inputState, setInputState) => {
    if (inputState.trim() !== "") {
      switch (category) {
        case "meats":
          setMeats([...meats, inputState]);
          setImagePath(process.env.PUBLIC_URL + "/fotograflar/image2.jpg");
          break;
        case "fruitsVegetables":
          setFruitsVegetables([...fruitsVegetables, inputState]);
          setImagePath(process.env.PUBLIC_URL + "/fotograflar/image2.jpg");
          break;
        case "freezer":
          setFreezer([...freezer, inputState]);
          setImagePath(process.env.PUBLIC_URL + "/fotograflar/image1.jpg");
          break;
        default:
          break;
      }
      setInputState("");
    }
  };

  const handleRemoveItem = (category, itemIndex) => {
    let updatedList = [];
    switch (category) {
      case "meats":
        updatedList = [...meats];
        break;
      case "fruitsVegetables":
        updatedList = [...fruitsVegetables];
        break;
      case "freezer":
        updatedList = [...freezer];
        break;
      default:
        break;
    }
    updatedList.splice(itemIndex, 1);
    switch (category) {
      case "meats":
        setMeats(updatedList);
        break;
      case "fruitsVegetables":
        setFruitsVegetables(updatedList);
        break;
      case "freezer":
        setFreezer(updatedList);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    saveState("meats", meats);
    saveState("fruitsVegetables", fruitsVegetables);
    saveState("freezer", freezer);
  }, [meats, fruitsVegetables, freezer]);

  return (
    <div className="container">
      <div>
        <h2>Et ve Süt Ürünleri</h2>
        <ul>
          {meats.map((item, index) => (
            <li key={index}>
              {item}
              <button onClick={() => handleRemoveItem("meats", index)}>
                X
              </button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={meatsInput}
          onChange={(e) => setMeatsInput(e.target.value)}
        />
        <button
          onClick={() => handleAddItem("meats", meatsInput, setMeatsInput)}
        >
          Ekle
        </button>
      </div>

      <div>
        <h2>Meyve ve Sebzeler</h2>
        <ul>
          {fruitsVegetables.map((item, index) => (
            <li key={index}>
              {item}
              <button
                onClick={() => handleRemoveItem("fruitsVegetables", index)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={fruitsVegetablesInput}
          onChange={(e) => setFruitsVegetablesInput(e.target.value)}
        />
        <button
          onClick={() =>
            handleAddItem(
              "fruitsVegetables",
              fruitsVegetablesInput,
              setFruitsVegetablesInput
            )
          }
        >
          Ekle
        </button>
      </div>

      <div>
        <h2>Dondurucu İçindekiler</h2>
        <ul>
          {freezer.map((item, index) => (
            <li key={index}>
              {item}
              <button onClick={() => handleRemoveItem("freezer", index)}>
                X
              </button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={freezerInput}
          onChange={(e) => setFreezerInput(e.target.value)}
        />
        <button
          onClick={() =>
            handleAddItem("freezer", freezerInput, setFreezerInput)
          }
        >
          Ekle
        </button>
      </div>
      <div className="image-container">
        <img src={imagePath} alt="Resim" style={{ cursor: "pointer" }} />
      </div>
    </div>
  );
}

export default App;
