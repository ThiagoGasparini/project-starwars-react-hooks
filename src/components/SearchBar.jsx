import React, { useContext } from 'react';
import contextApi from '../contextAPI/Context';

function SearchBar() {
  const { data, filtred, setFiltred } = useContext(contextApi);

  function searching({ target }) {
    const array = data.filter((element) => element.name.includes(target.value));
    setFiltred(array);
  }

  console.log(filtred);

  return (
    <div>
      <input
        type="search"
        placeholder="Search..."
        data-testid="name-filter"
        onChange={ searching }
      />
    </div>
  );
}

export default SearchBar;
