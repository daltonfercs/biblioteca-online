import React from 'react';

const SearchBar = ({ value, onChange }) => (
  <div className="search-bar">
    <input
      type="text"
      className="search-bar__input"
      placeholder="Buscar por título o autor..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);
export default SearchBar;