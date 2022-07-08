import React, { useContext } from 'react';
import contextApi from '../contextAPI/Context';

function FilterNumber() {
  const {
    columnFilter,
    setColumnFilter,
    comparisonFilter,
    setComparisonFilter,
    value,
    setValue,
    setFiltred,
    data,
  } = useContext(contextApi);

  const handleClick = () => {
    const filtred = data.filter((planet) => {
      if (comparisonFilter === 'maior que') {
        return Number(planet[columnFilter]) > Number(value);
      }
      if (comparisonFilter === 'menor que') {
        return Number(planet[columnFilter]) < Number(value);
      }
      if (comparisonFilter === 'igual a') {
        return Number(planet[columnFilter]) === Number(value);
      }
      return null;
    });
    setFiltred(filtred);
  };

  return (
    <div>
      <select
        onChange={ (event) => setColumnFilter(event.target.value) }
        data-testid="column-filter"
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        onChange={ (event) => setComparisonFilter(event.target.value) }
        data-testid="comparison-filter"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        onChange={ (event) => setValue(event.target.value) }
        type="number"
        value={ value }
        data-testid="value-filter"
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
    </div>
  );
}

export default FilterNumber;
