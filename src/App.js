import React, { useState } from "react";
import "./App.css";

function App() {
  const [meats, setMeats] = useState([]);
  const [fruitsVegetables, setFruitsVegetables] = useState([]);
  const [freezer, setFreezer] = useState([]);
  const [newItem, setNewItem] = useState("");

  const handleAddItem = (category) => {
    if (newItem.trim() !== "") {
      switch (category) {
        case "meats":
          setMeats([...meats, newItem]);
          break;
        case "fruitsVegetables":
          setFruitsVegetables([...fruitsVegetables, newItem]);
          break;
        case "freezer":
          setFreezer([...freezer, newItem]);
          break;
        default:
          break;
      }
      setNewItem("");
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
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button onClick={() => handleAddItem("meats")}>Ekle</button>
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
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button onClick={() => handleAddItem("fruitsVegetables")}>Ekle</button>
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
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button onClick={() => handleAddItem("freezer")}>Ekle</button>
      </div>
    </div>
  );
}

export default App;
