import React, { useState, useEffect } from "react";
import { loadState, saveState } from "./localStorage";
import "./App.css";

function App() {
  const [meats, setMeats] = useState([]);
  const [fruitsVegetables, setFruitsVegetables] = useState([]);
  const [freezer, setFreezer] = useState([]);
  const [meatsInput, setMeatsInput] = useState(""); // Meat için ayrı input state'i
  const [fruitsVegetablesInput, setFruitsVegetablesInput] = useState(""); // Meyve/Zebzeler için ayrı input state'i
  const [freezerInput, setFreezerInput] = useState(""); // Dondurucu için ayrı input state'i

  useEffect(() => {
    // Sayfa ilk açıldığında localStorage'dan verileri almaya yarar :)
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
          break;
        case "fruitsVegetables":
          setFruitsVegetables([...fruitsVegetables, inputState]);
          break;
        case "freezer":
          setFreezer([...freezer, inputState]);
          break;
        default:
          break;
      }
      setInputState(""); // Ekleme işlemi sonrasında input'u temizle
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
    // Herhangi bir veri değiştiğinde, localStorage'a verileri kaydeder
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
    </div>
  );
}

export default App;
