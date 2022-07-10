import React, { useContext, useState } from 'react';
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
    column,
    setColumn,
  } = useContext(contextApi);

  const [filters, setFilters] = useState(false);
  const [arrays, setArrays] = useState([]);
  /* const array = []; */

  const handleClick = () => {
    let filtred = data.filter((planet) => {
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
    filtred = filtred.filter((planet) => arrays.every((element) => {
      if (element.comparison === 'maior que') {
        // console.log(Number(planet[element.column]) > Number(element.val));
        return Number(planet[element.column]) > Number(element.val);
      }
      if (element.comparison === 'menor que') {
        return Number(planet[element.column]) < Number(element.val);
      }
      if (element.comparison === 'igual a') {
        return Number(planet[element.column]) === Number(element.val);
      }
      return false;
    }));
    const newColumn = column.filter((option) => option !== columnFilter);
    setFiltred(filtred);
    setColumn(newColumn);
    setFilters(true);
    /* array.push({
      column: columnFilter,
      comparison: comparisonFilter,
      val: value,
    }); */
    setArrays((prevState) => [
      ...prevState,
      { column: columnFilter, comparison: comparisonFilter, val: value },
    ]);
    setColumnFilter(newColumn[0]);
    setComparisonFilter('maior que');
    setValue(0);
  };

  const handleClickDelete = (columnDelete) => {
    setArrays(
      (prevState) => prevState.filter((element) => element.column !== columnDelete),
    );
  };

  const handleDeleteAll = () => {
    const columnsArray = ['population', 'orbital_period',
      'diameter', 'rotation_period', 'surface_water'];
    // setFilters(false);
    handleClickDelete();
    setArrays([]);
    setColumn(columnsArray);
    setFiltred(data);
  };

  return (
    <div>
      <select
        onChange={ (event) => setColumnFilter(event.target.value) }
        data-testid="column-filter"
      >
        {column.map((element) => (
          <option key={ element }>{element}</option>
        ))}
      </select>
      <select
        onChange={ (event) => setComparisonFilter(event.target.value) }
        data-testid="comparison-filter"
      >
        <option key="maior que">maior que</option>
        <option key="menor que">menor que</option>
        <option key="igual a">igual a</option>
      </select>
      <input
        onChange={ (event) => setValue(event.target.value) }
        type="number"
        value={ value }
        data-testid="value-filter"
      />
      <button type="button" data-testid="button-filter" onClick={ handleClick }>
        Filtrar
      </button>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ handleDeleteAll }
      >
        Remover Filtragens
      </button>
      {filters && (
        <div>
          {arrays.map((element, i) => (
            <div data-testid="filter" key={ i }>
              <span>{element.column}</span>
              <span>{element.comparison}</span>
              <span>{element.val}</span>
              <button
                data-testid="button-remove-filters"
                onClick={ () => handleClickDelete(element.column) }
                type="button"
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterNumber;
