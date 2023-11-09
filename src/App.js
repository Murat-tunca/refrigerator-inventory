// App.js
import React, { useState, useEffect } from "react";
import { loadState, saveState } from "./localStorage";
import "./App.css";
import Input from "./Input";
import SearchFilter from "./SearchFilter";

function App() {
  const [meats, setMeats] = useState([]);
  const [fruitsVegetables, setFruitsVegetables] = useState([]);
  const [freezer, setFreezer] = useState([]);
  const [meatsInput, setMeatsInput] = useState("");
  const [fruitsVegetablesInput, setFruitsVegetablesInput] = useState("");
  const [freezerInput, setFreezerInput] = useState("");
  const [imagePath, setImagePath] = useState(
    process.env.PUBLIC_URL + "/fotograflar/image1.jpeg"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const calculateSKT = (addDays, maxDays) => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + addDays);
    const sktDate = new Date(currentDate);
    sktDate.setDate(sktDate.getDate() + maxDays);
    const remainingDays = Math.floor(
      (sktDate - currentDate) / (1000 * 60 * 60 * 24)
    );

    return remainingDays;
  };

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

  const handleAddItem = (category, inputState, setInputState, message) => {
    if (inputState.trim() !== "") {
      const newItem = {
        name: inputState,
        message: message,
        category: category, // Yeni özellik: Kategori eklenmiş
      };

      switch (category) {
        case "meats":
          setMeats([...meats, newItem]);
          setImagePath(process.env.PUBLIC_URL + "/fotograflar/image2.jpeg");
          break;
        case "fruitsVegetables":
          setFruitsVegetables([...fruitsVegetables, newItem]);
          setImagePath(process.env.PUBLIC_URL + "/fotograflar/image2.jpeg");
          break;
        case "freezer":
          setFreezer([...freezer, newItem]);
          setImagePath(process.env.PUBLIC_URL + "/fotograflar/image1.jpeg");
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

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (category) => {
    setFilterCategory(category);
  };

  const getFilteredItems = () => {
    let filteredItems = [];
    switch (filterCategory) {
      case "meats":
        filteredItems = meats;
        break;
      case "fruitsVegetables":
        filteredItems = fruitsVegetables;
        break;
      case "freezer":
        filteredItems = freezer;
        break;
      default:
        filteredItems = [...meats, ...fruitsVegetables, ...freezer];
        break;
    }

    if (searchTerm) {
      filteredItems = filteredItems.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filteredItems;
  };

  const filteredItems = getFilteredItems();

  return (
    <div className="container">
      <SearchFilter
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        handleFilter={handleFilter}
      />
      <div>
        <div>
          <img
            className="etsut"
            src="https://media.istockphoto.com/id/1199736513/tr/vekt%C3%B6r/b%C3%BCy%C3%BCk-vitrin-buzdolab%C4%B1-s%C3%BCt-ve-et-g%C4%B1da-dolu-vekt%C3%B6r-%C3%A7izimi-beyaz-arka-planda-yal%C4%B1t%C4%B1lm%C4%B1%C5%9F.jpg?s=1024x1024&w=is&k=20&c=nCRRCCK9POvJbt1Eb1i-7TIkKPopiDSxs5pJhvcxLQI="
          />
        </div>
        <h2>Et ve Süt Ürünleri</h2>
        <ul>
          {filteredItems
            .filter((item) => item.category === "meats")
            .map((item, index) => (
              <li key={index}>
                {item.name} {item.message && `(${item.message})`}
                <button onClick={() => handleRemoveItem(item.category, index)}>
                  X
                </button>
              </li>
            ))}
        </ul>
        <Input
          category="meats"
          inputState={meatsInput}
          setInputState={setMeatsInput}
          handleAddItem={(category, inputState, setInputState, message) => {
            const skt = calculateSKT(7, 7);
            handleAddItem(
              category,
              inputState,
              setInputState,
              `${message} - SKT: ${skt} gün kaldı.`
            );
          }}
        />
      </div>

      <div>
        <div>
          <img
            className="meyveler"
            src="https://img.pixers.pics/pho_wat(s3:700/FO/53/01/27/98/700_FO53012798_d836007a6fc5525c6144f9d297eabb1a.jpg,700,432,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,480,382,jpg)/cikartmalar-meyve-ve-sebze-grubu-karikatur-illustrasyon.jpg.jpg"
          />
        </div>
        <h2>Meyve ve Sebzeler</h2>
        <ul>
          {filteredItems
            .filter((item) => item.category === "fruitsVegetables")
            .map((item, index) => (
              <li key={index}>
                {item.name} {item.message && `(${item.message})`}
                <button onClick={() => handleRemoveItem(item.category, index)}>
                  X
                </button>
              </li>
            ))}
        </ul>
        <Input
          category="fruitsVegetables"
          inputState={fruitsVegetablesInput}
          setInputState={setFruitsVegetablesInput}
          handleAddItem={(category, inputState, setInputState, message) => {
            const skt = calculateSKT(7, 7);
            handleAddItem(
              category,
              inputState,
              setInputState,
              `${message} - SKT: ${skt} gün kaldı.`
            );
          }}
        />
      </div>

      <div>
        <div>
          <img
            className="dondurucu"
            src="https://png.pngtree.com/png-clipart/20230918/original/pngtree-comicstyle-fridge-and-freezer-icon-vector-illustration-cuisine-household-cold-vector-png-image_12369636.png"
          />
        </div>
        <h2>Dondurucu İçindekiler</h2>
        <ul>
          {filteredItems
            .filter((item) => item.category === "freezer")
            .map((item, index) => (
              <li key={index}>
                {item.name} {item.message && `(${item.message})`}
                <button onClick={() => handleRemoveItem(item.category, index)}>
                  X
                </button>
              </li>
            ))}
        </ul>
        <Input
          category="freezer"
          inputState={freezerInput}
          setInputState={setFreezerInput}
          handleAddItem={(category, inputState, setInputState, message) => {
            const skt = calculateSKT(0, 180);
            handleAddItem(
              category,
              inputState,
              setInputState,
              `${message} - SKT: ${skt} gün kaldı.`
            );
          }}
        />
      </div>
      <div className="image-container">
        <img
          src={imagePath}
          alt="Resim"
          style={{ cursor: "pointer", width: "400px", height: "500px" }}
        />
      </div>
    </div>
  );
}

export default App;
