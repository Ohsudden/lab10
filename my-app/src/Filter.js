// Filter.js
import React from 'react';
import './App.css';

function Filter({ filterByYear }) {
  const handleChange = (event) => {
    const selectedYear = parseInt(event.target.value, 10);
    filterByYear(selectedYear);
  };

  return (
    <div className="filter">
      <input
        type="number"
        min="2000"
        max="2099"
        placeholder="Enter year"
        onChange={handleChange}
      />
    </div>
  );
}

export default Filter;