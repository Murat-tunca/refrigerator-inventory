// SearchFilter.js
import React from "react";

function SearchFilter({ searchTerm, handleSearch, handleFilter }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Ürün Ara"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <select onChange={(e) => handleFilter(e.target.value)}>
        <option value="">Hepsi</option>
        <option value="meats">Et ve Süt Ürünleri</option>
        <option value="fruitsVegetables">Meyve ve Sebzeler</option>
        <option value="freezer">Dondurucu İçindekiler</option>
      </select>
    </div>
  );
}

export default SearchFilter;
