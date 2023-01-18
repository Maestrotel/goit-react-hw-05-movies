import React from 'react';

function SearchBar() {
  return (
    <div>
      <form
      // onSubmit={handleClick}
      >
        <input
          // name="searchQuery"
          type="text"
          autoComplete="off"
          // value={searchQuery}
          // onChange={handleInput}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchBar;
